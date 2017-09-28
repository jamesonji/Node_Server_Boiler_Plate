const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// Create a local Strategy
const localOptions = {
  usernameField: 'email'
}
const localLogin = new LocalStrategy( localOptions, function(email, password, next){
  // verify the email and password, 
  // if correct email and password call done with the user,
  // otherwise call done with false
  
  User.findOne({ email : email}, function(err, user){
    if(err) return next(err, false);
    
    if(!user) return next(null, false);
    
    //compare passwords
    user.comparePassword(password, function(err, isMatch){
      // manage err
      if (err) return next(err)
      
      // if password doesnot match
      if(!isMatch){ return next(null, false);}
      
      return next(null, user);
    })
  })
})

// Set up options for JWT Stragtegy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, next){ // payload is decoded user token
  // See if the user ID in the payload exists in the database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  
  User.findById(payload.sub, function(err, user){
    if(err) {return next(err, false); }
    
    if(user){
      next(null, user); // find a user
    }else{
      next(null, false); // no user found
    }
  })
})

// Tell passport to use this Stragtegy
passport.use(jwtLogin);

passport.use(localLogin);