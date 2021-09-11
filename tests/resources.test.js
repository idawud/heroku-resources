const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// chai configuration
chai.use(chaiHttp);
chai.should();

describe('Heroku Resources', () => {
    describe('GET /', () => {
        it('should get all resources in a json format', (done) => {
            const expectedPayload = {
                postgres: {
                    dbname: 'dbname',
                    host: 'hostcom',
                    password: 'password',
                    port: '5432',
                    user: 'user',
                    url: 'postgres://user:password@hostcom:5432/dbname'
                },
                mysql: {
                    dbname: 'dbname',
                    host: 'hostcom',
                    password: 'password',
                    port: '3306',
                    user: 'user',
                    url: 'mysql://user:password@hostcom:3306/dbname'
                },
                redis: {
                    host: 'hostcom',
                    password: 'password',
                    port: '9674',
                    user: 'user',
                    url: 'redis://user:password@hostcom:9674/'
                },
            };

            chai.request(app)
                .get('/')
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.eql(expectedPayload);
                    done();
                });
        });
    });
});
