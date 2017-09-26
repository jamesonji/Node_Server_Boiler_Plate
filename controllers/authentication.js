const User = require('../models/users');

exports.signup = function(req, res, next){
  // if a user with the given email exists
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
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
      res.json({success: true});
    })
  });
}