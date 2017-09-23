var express = require('express');
var router = express.Router();

// get a list of users
router.get('/', function(req, res, next) {
  res.render('users/index');
});

// get to the create user page
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

// add a new user to db
router.post('/users', function(req, res, next) {
  res.redirect('/users');
});

// update a user in the db
router.put('/users/:id', function(req, res, next)){
  res.send({type: 'PUT'});
}

// delete a user in the db
router.delete('/users/:id', function(req, res, next)){
  res.send({type:'DELETE'});
}
module.exports = router;
