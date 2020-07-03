const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const Task = mongoose.model('Task', {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

// const me = new Task({
//   description: 'Progress in Node Class',
//   completed: true,
// });

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

const me = new User({
  name: 'Pablo',
  // class: 'Fullstack Engineer',
  email: 'bloomingdale@crup.io',
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((err) => {
    console.log(err);
  });
