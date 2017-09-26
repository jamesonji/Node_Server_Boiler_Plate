const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10;

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
  password: {
    type: String, 
    required: true 
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

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const User = mongoose.model('user', UserSchema);

module.exports = User;