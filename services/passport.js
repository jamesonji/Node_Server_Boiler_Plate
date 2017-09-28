const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Stragtegy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){ // payload is decoded user token
  // See if the user ID in the payload exists in the database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  
  User.findById(payload.sub, function(err, user){
    if(err) {return done(err, false); }
    
    if(user){
      done(null, user); // find a user
    }else{
      done(null, false); // no user found
    }
  })
})

// Tell passport to use this Stragtegy
passport.use(jwtLogin);