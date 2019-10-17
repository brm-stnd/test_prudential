var express = require('express')
var router = express.Router()

router.use('/products', function (req, res, next) {
    res.status(200).json({
        "message": "Hello there"
    })
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'API V2' })
});

module.exports = router;
