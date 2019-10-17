var express = require('express')
var router = express.Router()
var authController = require('../../../controllers/api/v1/authController.js')
const auth = require('../../../middleware/auth')

router.post('/signup', authController.signUp)
router.post('/login', authController.login)

module.exports = router
