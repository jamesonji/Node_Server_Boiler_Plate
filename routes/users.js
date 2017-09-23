var express = require('express');
var router = express.Router();

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
  console.log(req.body);
  res.send({
    type:'POST',
    name: req.body.name,
    rank: req.body.rank
  })
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
