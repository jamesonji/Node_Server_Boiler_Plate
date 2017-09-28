const jwt = require('jwt-simple');
const User = require('../models/users');
const config = require('../config.js');

function tokenForUser(user){
  // generate a token for user
  const timestamp = new Date().getTime();
  // iat: issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
  // User already had their email and password authed
  // We just need to give them token
  // passport's next(null, user) will pass user to req
  res.send({token: tokenForUser(req.user)})
}


// Sign up a user in host/signup
exports.signup = function(req, res, next){
  // if a user with the given email exists
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  if(!username || !email || !password){
    return res.status(422).send({error: 'You must provide username, email and password'});
  }
  
  User.findOne({ email: email}, function(err, existingUser){
    if(err) return err;
    
    // if a user with email does exists, return an error
    if(existingUser){
      return res.status(422).send({error: 'Email is in use.'});
    }
    
    // if a user with email does NOT exist, create and save user record
    const user = new User({
      username: username,
      email: email,
      password: password,
    })
    
    user.save(function(err){
      if(err) return next(err);
      
      //Respond to request indicating the user was created
      res.json({token: tokenForUser(user)});
    })
  });
}