const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

//create user Schema & model
const UserSchema = new Schema({
  username:{
    type: String,
    required: [true, 'User name is required']
  },
  fname: {
    type: String,
    default: "",
  },
  lname: {
    type: String,
    default: ""
  },
  dob:{
    type: Date,
    default: Date.now()
  },
  available:{
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;