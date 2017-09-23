const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

//create user Schema & model
const UserSchema = new Schema({
  username:{
    type: String,
    required: [true, 'User name is required']
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  dob:{
    type: Date,
    default: Date.now()
  },
  available:{
    type: Boolean,
    default: false
  }
  
  // add in geo location
});

const User = mongoose.model('user', UserSchema);

module.exports = User;