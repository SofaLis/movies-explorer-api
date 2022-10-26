const { SerserErr } = require('../utils/constants');

const errServer = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(statusCode === 500 ? SerserErr : message);
  next();
};

module.exports = {
  errServer,
};
