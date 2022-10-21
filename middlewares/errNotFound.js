const NotFound = require('../utils/err/NotFound');

module.exports.errNotFound = (req, res, next) => {
  next(new NotFound('Простите, страница не найдена'));
};
