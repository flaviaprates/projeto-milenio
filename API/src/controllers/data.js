const knex = require('../connection');

const saveGraph = async (req, res) => {
    const { data } = req.body;

    const dataInJson = JSON.stringify(data);

    if (!data) {
        return res.status(400).json('Data é um campo obrigatório.');
    }

    try {
        const existData = await knex('routes').where({ data: dataInJson });

        if (existData[0]) {
            return res.status(400).json('As rotas já existem no banco de dados.');
        }

        const insertData = await knex('routes').insert({ data: dataInJson });

        if (!insertData) {
            return res.status(400).json('Não foi possível cadastrar as rotas.');
        }

        const response = await knex('routes').where({ data: dataInJson }).first();

        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getGraph = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json('É obrigatório informar o id.');
    }

    try {
        const requestedData = await knex('routes').where({ id }).first();

        if (!requestedData) {
            return res.status(404).json('Não foi possível encontrar as rotas no id específico.');
        }

        return res.status(200).json(requestedData);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const findRoutes = async (req, res) => {
    const { id, source, target } = req.params;
    const { maxStops } = req.query;

    if (!id || !source || !target) {
        return res.status(400).json('É obrigatório informar id, cidade de partida e cidade de chegada.');
    }

    try {
        const data = await knex('routes').select('data').where({ id }).first();

        if (!data) {
            return res.status(404).json('Não foi possível encontrar as rotas no id específico.');
        }

        const dataArray = Object.values(data);

        const newSource = source.toLowerCase();
        const newTarget = target.toLowerCase();

        const allRouts = [];
        const response = [];

        const routesWihtNoStop = [];

        dataArray[0].map((route) => {
            routesWihtNoStop.push((route.source + route.target).toLowerCase());
        });

        const sourceTown = routesWihtNoStop.filter((array) => {
            return array[0] === newSource;
        });

        const targetTown = routesWihtNoStop.filter((array) => {
            return array[1] === newTarget;
        });

        if (sourceTown[0] && targetTown[0]) {

            allRouts.push(routesWihtNoStop);

            if (maxStops && maxStops > 1) {
                const routesWithStop = [];

                for (let i = 1; i <= maxStops - 1; i++) {
                    for (let j = 0; j < allRouts.length; j++) {
                        allRouts[j].map((route) => {
                            for (let item of routesWihtNoStop) {
                                if (route[0] === newSource && route[route.length - 1] === item[0] && route[route.length - 1] !== item[1]) {
                                    routesWithStop.push((route + item[1]).toLowerCase());
                                }
                            }
                        });
                    }
                    allRouts.push(routesWithStop);
                }

                const allDifferentRoutes = [...new Set(allRouts)];

                const allRoutesWithSourceAndTarget = [];

                for (let i = 0; i < allDifferentRoutes.length; i++) {
                    allDifferentRoutes[i].map((route) => {
                        if (route[0] === newSource && route[route.length - 1] === newTarget && route.length <= Number(maxStops) + 1) {
                            allRoutesWithSourceAndTarget.push(route);
                        }
                    });
                }

                const allResponse = [...new Set(allRoutesWithSourceAndTarget)];

                allResponse.map((route) => {
                    response.push({
                        route: route.toUpperCase(),
                        stops: route.length - 1
                    });
                });

                return res.status(200).json({ routes: response });
            } else {
                allRouts[0].map((route) => {
                    if (route[0] === newSource && route[1] === newTarget) {
                        response.push({
                            route: route.toUpperCase(),
                            stops: route.length - 1
                        });
                    }
                });

                if (response[0]) {
                    return res.status(200).json({ routes: response });
                } else {
                    return res.status(404).json('Não há rota direta entre as cidades.');
                }
            }

        }

        return res.status(404).json('Não foi possível encontrar uma rota entre as cidades.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const minDistance = async (req, res) => {
    const { id, source, target } = req.params;

    if (!id || !source || !target) {
        return res.status(400).json('É obrigatório informar id, cidade de partida e cidade de chegada.');
    }

    try {
        const data = await knex('routes').select('data').where({ id }).first();

        if (!data) {
            return res.status(404).json('Não foi possível encontrar as rotas no id específico.');
        }

        const dataArray = Object.values(data);

        const newSource = source.toLowerCase();
        const newTarget = target.toLowerCase();

        const allRouts = [];
        let response = [];

        const routesWithNoStop = [];

        dataArray[0].map((route) => {
            routesWithNoStop.push([(route.source + route.target).toLowerCase(), route.distance]);
        });

        const sourceTown = routesWithNoStop.filter((array) => {
            return array[0][0] === newSource;
        });

        const targetTown = routesWithNoStop.filter((array) => {
            return array[0][1] === newTarget;
        });

        if (sourceTown[0] && targetTown[0]) {

            allRouts.push(routesWithNoStop);

            const routesWithStop = [];

            for (let j = 0; j < allRouts[0].length; j++) {

                allRouts[j].map((route) => {

                    for (let item of routesWithNoStop) {
                        if (route[0][0] === newSource && route[0][route[0].length - 1] === item[0][0] && route[0][route[0].length - 1] !== item[0][1]) {
                            routesWithStop.push([(route[0] + item[0][1]).toLowerCase(), route[1] + item[1]]);
                        }
                    }
                });
                allRouts.push(routesWithStop);
            }

            const allDifferentRoutes = [...new Set(allRouts)];

            const allRoutesWithSourceAndTarget = [];

            for (let i = 0; i < allDifferentRoutes.length; i++) {
                allDifferentRoutes[i].map((route) => {
                    if (route[0][0] === newSource && route[0][route[0].length - 1] === newTarget) {
                        allRoutesWithSourceAndTarget.push(route);
                    }
                });
            }

            const minRouteDistance = allRoutesWithSourceAndTarget[0][1];

            response = allRoutesWithSourceAndTarget.filter((route) => {
                return route[1] < minRouteDistance;
            });

            if (!response[0]) {

                response = allRoutesWithSourceAndTarget;

                return res.status(200).json({ distance: response[0][1], path: response[0][0].toUpperCase().split('') });
            }

            return res.status(200).json({ distance: response[0][1], path: response[0][0].toUpperCase().split('') });
        }

        return res.status(404).json('Não foi possível encontrar uma rota entre as cidades.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    saveGraph,
    getGraph,
    findRoutes,
    minDistance
}