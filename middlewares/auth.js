const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/err/Unauthorized');

const { secretKey } = require('../utils/config');
const { UnautAuth } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized(UnautAuth));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new Unauthorized(UnautAuth));
    return;
  }
  req.user = payload;
  next();
};
