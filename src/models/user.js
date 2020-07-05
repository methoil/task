const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(val) {
      if (val.toLowerCase().includes('password')) {
        throw new Error('Password contains the text "password" - make a more secure password!');
      }
    },
  },
  class: {
    type: String,
    trim: true,
    default: 'NEET',
    validate(val) {
      if (!val || val.length < 3) {
        throw new Error('Class must be at least 3 characters');
      }
    },
  },
});

module.exports = User;
