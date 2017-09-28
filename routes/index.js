var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Authentication = require('../controllers/authentication');
const passport = require('passport');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt',{session: false}); // turn off cookie based token
const requireSignIn = passport.authenticate('local', {session: false});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Super secret code is ABC123' });
});

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

// User Sign up
router.post('/signup', Authentication.signup);

// User Sign in
router.post('/signin', requireSignIn, Authentication.signin);


// A test route
router.get('/test', requireAuth, function(req, res, next){
  res.send('hi there');
})

module.exports = router;
