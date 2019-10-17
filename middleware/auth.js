var jwt             = require('jsonwebtoken');
var FuncHelpers     = require('../helpers/response.js');

exports.isAuthenticated = function (req, res, next) {
    var token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if(err){
                res.status(401).json(FuncHelpers.responseResult("ERROR", "", "Failed for authenticated token"));
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.status(401).json(FuncHelpers.responseResult("ERROR", "", "No Token Provided"));
    }
}