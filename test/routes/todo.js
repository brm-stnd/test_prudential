let mongoose = require("mongoose");
let Users = require("../../models/api/v1/users");
let Todo = require("../../models/api/v1/todo");

var app = require('../../app');
const faker = require('faker');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should;

chai.use(chaiHttp);

var user_data =  {
    username        : faker.internet.userName(),
    email           : faker.internet.email(),
    password        : faker.internet.password(),
    first_name      : faker.name.firstName(),
    last_name       : faker.name.lastName()
}

describe('Todo', () => {

    beforeEach((done)=>{
        Users.deleteMany({}, (err) => {
            done();
        });
    });

    beforeEach((done)=>{
        Users.create(user_data, (err, data)=>{
            if(err) console.log(err)
            result_register = data
            done()
        })
    })
    
    beforeEach(done => {
        chai.request(app)
            .post('/api/v1/users/auth')
            .send(user_data)
            .end(function (err, res) {
                token = res.body.token
                done()
            })
    })

    after((done)=>{
        Todo.deleteMany({}, (err) => {
            done();
        });
    })
    
    describe('/GET todo', () => {
        it('it should GET all the todo', (done) => {
            chai.request(app)
                .get('/api/v1/todo')
                .set('authorization', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.a('object');

                    done();
                });
        });
    });

    describe('/GET/:id todo', () => {
        it('get a post by given id', function (done) {
            let itemSample = new Todo({
                content: 'Sample only for delete'
            });
            itemSample.save((err, todo) => {
                chai.request(app)
                    .get('/api/v1/todo/' + todo.id)
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');

                        done();
                    });
            })
        });
    });

    describe('/GET/:id wrong todo', () => {
        it('get a post by given wrong id', function (done) {
            let itemSample = new Todo({
                content: 'Sample only for delete'
            });
            itemSample.save((err, todo) => {
                chai.request(app)
                    .get('/api/v1/todo/ksjdhfkasjhfjashf')
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.a('object');

                        done();
                    });
            })
        });
    });

    describe('/GET/:content todo', () => {
        it('get a post by given content', function (done) {
            let itemSample = new Todo({
                content: 'Sample'
            });
            itemSample.save((err, todo) => {
                chai.request(app)
                    .get('/api/v1/todo/content/' + todo.content)
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');

                        done();
                    });
            })
        });
    });

    describe('/POST todo', () => {
        var itemSample = {
            content: "Merayap"
        }

        it('it should POST succcess', (done) => {
            chai.request(app)
                .post('/api/v1/todo')
                .set('authorization', token)
                .send(itemSample)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res).to.be.a('object');

                    done();
                });
        });
    });

    describe('/POST wrong todo', () => {
        var itemSample = {
            content_todo: "Merayap"
        }

        it('it should POST error', (done) => {
            chai.request(app)
                .post('/api/v1/todo')
                .set('authorization', token)
                .send(itemSample)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res).to.be.a('object');

                    done();
                });
        });
    });

    describe('/PUT/:id todo', () => {
        it('should update a post by single id', function(done) {
            let itemSample = new Todo({
                content: 'Sample for update'
            });
            itemSample.save((err, todo) => {
                chai.request(app)
                    .put('/api/v1/todo/' + todo.id)
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');

                        done();
                    });
            })
        });
    });

    describe('/PUT/:id wrong id', () => {
        it('should update a post by wrong id', function(done) {
            let itemSample = new Todo({
                content: 'Sample for update wrong'
            });
            itemSample.save((err, todo) => {
                chai.request(app)
                    .put('/api/v1/todo/dfvdsgsdgd')
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.a('object');

                        done();
                    });
            })
        });
    });

    describe('/DELETE/:id todo', () => {
        it('should destroy a post by given id', function (done) {
            let itemSample = new Todo({
                content: 'Sample only for delete by id'
            });
            itemSample.save((err, todo) => {
                chai.request(app)
                    .delete('/api/v1/todo/' + todo.id)
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');

                        done();
                    });
            })
        });
    });

    describe('/DELETE/:id wrong todo', () => {
        it('should destroy a post by given wrong id', function (done) {
            let itemSample = new Todo({
                content: 'Sample only for delete'
            });
            itemSample.save((err, todo) => {
                chai.request(app)
                    .delete('/api/v1/todo/cvzxcvzxvxv')
                    .set('authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.a('object');

                        done();
                    });
            })
        });
    });

});