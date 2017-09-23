var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/users', function(req, res, next) {
  res.redirect('/users');
});

module.exports = router;
