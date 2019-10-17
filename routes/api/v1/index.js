var express = require('express')
var router = express.Router()
const authRouter = require('./auth')
const productsRouter = require('./products')


router.use('/auth', authRouter)
router.use('/products', productsRouter)

router.get('/', function (req, res, next) {
  res.render('index', { title: 'API V1' })
});

module.exports = router;
