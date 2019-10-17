let mongoose = require("mongoose");
let Users = require("../../models/api/v1/users");

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

describe('Users', () => {

    /* beforeEach((done)=>{
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
    }) */

    after((done)=>{
        Users.deleteMany({}, (err) => {
            done();
        });
    })

});