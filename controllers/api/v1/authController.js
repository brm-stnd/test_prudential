var FuncHelpers     = require('../../../helpers/response')
var Users           = require('../../../models/api/v1/users')
const jwt           = require('jsonwebtoken')
const bcrypt        = require('bcryptjs')
const env           = require('dotenv').config()
const saltRounds    = 10

exports.signUp = function(req, res, next){
    req.body['password']    = bcrypt.hashSync(req.body.password, saltRounds)

    Users.create(req.body)
        .then((users) => {
            let resuts = {
                id              : users._id,
                name            : users.name,
                email           : users.email,
                password_digest : users.password,
                created_at      : users.created_at,
                updated_at      : users.updated_at
            }
            res.status(201).json(FuncHelpers.responseResult("OK", resuts, ""))
        })
        .catch((err) => {
            res.status(422).json(FuncHelpers.responseResult("ERROR", "", err))
        })
}

exports.login = (req, res, next) => {
    
    Users.findOne({"email": req.body.email.toLowerCase()})
        .then((users)=>{
            if(users!==null){
                bcrypt.compare(req.body.password, users.password).then(function (result) {
                    if (result) {

                        Users.findOne({"email": req.body.email.toLowerCase()}).select('_id')
                            .then((users)=>{
                                var token = jwt.sign(users.toJSON(), process.env.SECRET_KEY, { 
                                    algorithm: 'HS256',
                                    expiresIn: '1d'
                                });

                                let data_login = {
                                    access_token    :   token
                                }
                                
                                res.status(200).json(FuncHelpers.responseResult("OK", data_login, ""))
                            })
                            .catch((err)=>{
                                res.status(401).json(FuncHelpers.responseResult("ERROR", "", err));
                            });
                    } else {
                        res.status(401).send(FuncHelpers.responseResult("ERROR", "", "Password is wrong"))
                    }
                }).catch((err) => { return next(err) })
            }else{
                res.status(401).send(FuncHelpers.responseResult("ERROR", "", "Email not exist"));
            }
        })
        .catch((err)=>{
            res.status(422).send(FuncHelpers.responseResult("ERROR", "", "Can't login"));
        });

}






