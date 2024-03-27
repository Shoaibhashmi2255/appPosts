// const mongose = require('mongoose');
// const uniqueValidator = require ('mongoose-unique-validator');

// const userSchema = mongose.Schema({
//     email : {type : String , required : true},
//     password : {type : String , required : true, },
// });
// userSchema.plugin(uniqueValidator);

// module.exports = mongose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//   Name: {
//     type: String,
//     required: true
//   },
  email: {
    type: String,
    required: true,
    unique: true // Enforces a unique constraint on the Email field
  },
  password: {
    type: String,
    required: true
  }
});

// Validate that the Email field is not null or empty before saving
userSchema.pre('save', function(next) {
  if (!this.email || this.email.trim().length === 0) {
    return next(new Error('Email cannot be null or empty'));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);