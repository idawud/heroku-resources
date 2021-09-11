const { expect } = require('chai');
const chai = require('chai');
const ResourcesService = require('../services/resource-service');

chai.should();

describe('Resources Service', () => {
    function getInstance() {
        return new ResourcesService();
    }

    it('should get postgres database resources', () => {
        const service = getInstance();
        const postgresResource = service.getPostgresDBResource();

        const expectedPostgresResource = {
            dbname: 'dbname',
            host: 'hostcom',
            password: 'password',
            port: '5432',
            user: 'user',
            url: 'postgres://user:password@hostcom:5432/dbname'
        };
        expect(postgresResource).to.eql(expectedPostgresResource);
    });

    it('should get MySQL database resources', () => {
        const service = getInstance();
        const mySQLResource = service.getMySqlDBResource();

        const expectedMySQLResource = {
            dbname: 'dbname',
            host: 'hostcom',
            password: 'password',
            port: '3306',
            user: 'user',
            url: 'mysql://user:password@hostcom:3306/dbname'
        };
        expect(mySQLResource).to.eql(expectedMySQLResource);
    });

    it('should get empty database resources if db url is not provided', () => {
        const service = getInstance();
        const mySQLResource = service.getDatabaseResourceData();

        const expectedMySQLResource = {};
        expect(mySQLResource).to.eql(expectedMySQLResource);
    });

    it('should throw error when db url is not properly formed', () => {
        const service = getInstance();
        expect(() => service.getDatabaseResourceData('mysql://user:pass@host'))
            .to.throw(`Cannot read property 'split' of undefined`);
    });


    it('should get Redis resources', () => {
        const service = getInstance();
        const redisResource = service.getRedisResource();

        const expectedRedisResource = {
            host: 'hostcom',
            password: 'password',
            port: '9674',
            user: 'user',
            url: 'redis://user:password@hostcom:9674/'
        };
        expect(redisResource).to.eql(expectedRedisResource);
    });
});

