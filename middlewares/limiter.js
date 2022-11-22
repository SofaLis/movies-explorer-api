const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 10000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});
