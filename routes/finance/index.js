var express = require('express');
var router = express.Router();
var invoice = require('./invoice');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond add User with a resource');
});

router.use('/invoice', invoice);

module.exports = router;
