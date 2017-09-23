const express = require('express');
const router = express.Router();
const User = require('../model/users');

// get a list of users
// get: localhost/users
router.get('/', function(req, res, next) {
  res.render('users/index');
});

// get to the create user page
// get : localhost/users/new
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

// add a new user to db
// post: locahost/users
router.post('/', function(req, res, next) {
  // create a new user and send the new user back
  User.create(req.body)
  .then(function(user){
    res.send(user)
  })
  .catch(next);
});

// update a user in the db
// put: localhost: users/:id
router.put('/:id', function(req, res, next) {
  res.send({type: 'PUT'});
});

// delete a user in the db
// delete: localhost: users/:id
router.delete('/:id', function(req, res, next) {
  res.send({type:'DELETE'});
});
module.exports = router;
