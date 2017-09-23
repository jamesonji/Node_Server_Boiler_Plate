const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type:{
    type: String,
    default: 'Point'
  },
  coordinates:{
    type: [Number], // expect Array of Numbers
    index: '2dsphere'
  }
});

//create user Schema & model
const UserSchema = new Schema({
  username:{
    type: String,
    required: [true, 'User name is required']
  },
  fname: {
    type: String,
    default: ""
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
  },
  geometry: GeoSchema
});

const User = mongoose.model('user', UserSchema);

module.exports = User;