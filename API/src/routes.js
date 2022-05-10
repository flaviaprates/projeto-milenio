const express = require('express');
const data = require('./controllers/data');

const routes = express();

routes.post('/graph', data.saveGraph);

routes.get('/graph/:id', data.getGraph);

routes.post('/routes/:id/from/:source/to/:target', data.findRoutes);

routes.post('/distance/:id/from/:source/to/:target', data.minDistance);

module.exports = routes;