const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequest = require('../utils/err/BadRequest');
const NotFound = require('../utils/err/NotFound');
const Conflict = require('../utils/err/Conflict');

const { secretKey } = require('../utils/config');
const { NFUser, BR, Conf } = require('../utils/constants');

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(NFUser);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFound(NFUser);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BR));
        return;
      }
      if (err.name === 'MongoServerError') {
        next(new Conflict(Conf));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, email, password: hash,
      },
    ))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BR));
        return;
      }
      if (err.name === 'MongoServerError') {
        next(new Conflict(Conf));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.logoff = (req, res) => {
  res.cookie('jwt', 'token', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(200)
    .send({ message: 'вы покинули аккаунт' });
};
