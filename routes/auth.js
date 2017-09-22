var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

module.exports = router;
