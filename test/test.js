const supertest = require("supertest");
const assert = require('assert');
const app = require("../server.js");

var id = '';
var token = '';

describe('Test api', function() {   
    
    it('debe responder "api funcionando"', function(done) {     
        supertest(app)
        .get('/api/v1/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    }); 

    it('debe crear un usuario', function(done) {
        supertest(app)
        .post('/api/v1/usuarios/registrar')
        .send({ username: "test", email: "test@test.com", password: "aa112233", nombre: "test", apellido: "test", direccion: "test" })
        .set('Accept', 'application/json')
        .expect(200, done);
        
    });

    it('login usuario', function() {
      return supertest(app)
        .post('/api/v1/usuarios/login')
        .send({ username: "test", password: "aa112233" })
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {

            token = response.body.data.token;
            id = response.body.data.usuario._id;
            assert(!response.body.error, 'Error en el login');
            
        })
        .catch(err => done(err))
    });

    it('Update usuario', function(done) {
        supertest(app)
        .put('/api/v1/usuarios/' + id)
        .set('Authorization', 'Bearer ' + token)
        .send({ nombre: "test update"})
        .set('Accept', 'application/json')
        .expect(200, done);
    });


    it('get usuario', function(done) {
        supertest(app)
        .get('/api/v1/usuarios/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .expect(200, done)
    });

    it('delete usuario test', function(done) {
       supertest(app)
       .delete('/api/v1/usuarios/'+ id)
       .set('Accept', 'application/json')
       .set('Authorization', 'Bearer ' + token)
       .expect(200, done);
    });


});



