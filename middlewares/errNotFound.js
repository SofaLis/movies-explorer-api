const NotFound = require('../utils/err/NotFound');
const { NF } = require('../utils/constants');

module.exports.errNotFound = (req, res, next) => {
  next(new NotFound(NF));
};
