const express = require('express');
const ResourcesService = require('../services/resource-service');

const routes = express.Router();
const resourceService = new ResourcesService();

routes.get('/', (_, res) => {
    return res.setHeader('content-type', 'application/json')
        .status(200)
        .json({
            postgres: resourceService.getPostgresDBResource(),
            mysql: resourceService.getMySqlDBResource(),
            redis: resourceService.getRedisResource(),
        });
});

module.exports = routes;
