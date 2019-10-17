const mongoose      = require("mongoose")
const Schema        = mongoose.Schema
var validate        = require('mongoose-validator')
var uniqueValidator = require('mongoose-unique-validator')

var contentValidator = [
    validate({
      validator: 'isLength',
      arguments: [4, 200],
      message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    })
  ]

const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: contentValidator
    },
    price: {
        type: Number,
        required: true
    },
    imageurl: {
        type: String
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
}, { collection: 'products' })

productsSchema.plugin(uniqueValidator)

var Products = mongoose.model("Products", productsSchema)
module.exports = Products