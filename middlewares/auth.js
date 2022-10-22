const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/err/Unauthorized');

const { secretKey } = require('../utils/config');
const { UnautAuth } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
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
  }
  req.user = payload;
  next();
};
