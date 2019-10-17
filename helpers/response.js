const env           = require('dotenv').config();

exports.responseResult = function(status, results, error){
    return {
        status  : status,
        results : results,
        error   : error
    }
};