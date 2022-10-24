const mongoose = require('mongoose');

const { Schema } = mongoose;
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const { BR, ValidEmail } = require('../utils/constants');
const BadRequest = require('../utils/err/BadRequest');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: ValidEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadRequest(BR));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadRequest(BR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
