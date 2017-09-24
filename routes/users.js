const express = require('express');
const router = express.Router();
const User = require('../model/users');

// get a list of users near location
// get: localhost:3000/users?lng=-80&lat=25.793
router.get('/', function(req, res, next) {
  // find nearby users
  User.find({})
    .then(function(users){
      console.log(users);
      res.render('users/index', {users: users})
    })
    .catch(next)
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
  
  // Find user by Id then update record by req.body
  User.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function(){
      // Update completed
      // Refind the updated user
      // Then send it back to frontend
      User.findOne({_id: req.params.id}).then(function(user){
        res.send(user);
      })
    })
    .catch(next);
});

// delete a user in the db
// delete: localhost: users/:id
router.delete('/:id', function(req, res, next) {
  // get :id, use req.params.id
  User.findByIdAndRemove({ _id: req.params.id})
    .then(function(user){
      res.send(user);
    })
    .catch(next);
});

module.exports = router;
