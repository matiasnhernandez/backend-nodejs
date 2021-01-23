const { responseWhitelist } = require('express-winston');
const request = require('supertest');
const app = require('../server');

describe('GET /curso/api/v1/test', function() {   
    it('debe responder "api funcionando"', function(done) {     
        request(app)
        .get('/api/v1/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    }); 
});
