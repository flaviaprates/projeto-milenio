const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: 'milenio_capital'
    }
});

module.exports = knex;