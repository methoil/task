const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const me = new Task({
  description: 'Vacume floor again',
  // completed: true,
});

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

// const me = new User({
//   name: 'Timothy',
//   class: 'Mail Man',
//   email: 'fedex@crup.io',
//   password: '         password22332',
// });

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => {
    console.log(err);
  });
