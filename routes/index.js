var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Authentication = require('../controllers/authentication');
const passport = require('passport');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt',{session: false}); // turn off cookie based token


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', Authentication.signup);

router.post('/signin', function(req, res, next){
  // Find user by Id then update record by req.body
  User.findOne({username: req.body.username})
    .then(function(user){
      // test a matching password
      user.comparePassword(req.body.password, function(err, isMatch){
        // manage err
        if (err) return next(err)
        
        // if password matches
        if(isMatch){
          res.send('Password Match');
        }else{
          res.send('Password not match');
        }
      })
    })
    .catch(next);
})

router.get('/test', requireAuth, function(req, res, next){
  res.send('hi there');
})

module.exports = router;
