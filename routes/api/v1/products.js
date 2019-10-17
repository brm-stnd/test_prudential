var express = require('express')
var router = express.Router()
const auth = require('../../../middleware/auth')
var productsController = require('../../../controllers/api/v1/productsController.js')

router.post('/', auth.isAuthenticated, productsController.insertProducts)
    .get('/', auth.isAuthenticated, productsController.getProducts)

router.get('/:id', auth.isAuthenticated, productsController.getProducts)
    .put('/:id', auth.isAuthenticated, productsController.updateProducts)
    .delete('/:id', auth.isAuthenticated, productsController.deleteProducts)

module.exports = router;
