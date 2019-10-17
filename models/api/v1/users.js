const mongoose      = require("mongoose")
const Schema        = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator')
const bcrypt        = require('bcryptjs')

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: { 
      type: Date, 
      default: Date.now 
    },
    updated_at: { 
      type: Date, 
      default: Date.now 
    }
}, { collection: 'users' })

usersSchema.plugin(uniqueValidator)

var Users = mongoose.model("Users", usersSchema)
module.exports = Users