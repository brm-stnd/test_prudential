var FuncHelpers     = require('../../../helpers/response');
var Products        = require('../../../models/api/v1/products');

exports.insertProducts = function(req, res, next){
    Products.create(req.body)
        .then((product) => {
            res.status(201).json(FuncHelpers.responseResult("OK", product, ""))
        })
        .catch((err) => {
            res.status(422).json(FuncHelpers.responseResult("ERROR", "", err))
        })
}

exports.getProducts = function(req, res, next){
    var find_q = {}
    if(req.params.id) {
        find_q["_id"] = req.params.id
    }

    Products.find(find_q)
        .then((product)=>{
            res.status(200).json(FuncHelpers.responseResult("OK", product, ""))
        })
        .catch((err)=>{
            res.status(422).json(FuncHelpers.responseResult("ERROR", "", err))
        });
}

exports.updateProducts = function(req, res, next){  
    let id          = req.params.id
    req.body.updated_at = new Date()

    Products.findOneAndUpdate({"_id":id}, req.body)
        .then((product)=>{

            Products.findOne({"_id":id}).select('_id name price imageurl created_at updated_at')
                .then((product)=>{
                    res.status(201).json(FuncHelpers.responseResult("OK", product, ""))
                })
                .catch((err)=>{
                    res.status(422).json(FuncHelpers.responseResult("ERROR", "", err))
                });

        })
        .catch((err)=>{
            res.status(422).json(FuncHelpers.responseResult("ERROR", "", err))
        });
}

exports.deleteProducts = function(req, res) {
    let id          = req.params.id

    Products.findByIdAndRemove(id)
        .then((product)=>{

            result_delete = {
                "message": id+" deleted"
            }
            res.status(200).json(FuncHelpers.responseResult("OK", result_delete, ""))
        })
        .catch((err)=>{
            res.status(422).json(FuncHelpers.responseResult("ERROR", "", err))
        });
}