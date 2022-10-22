const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.mongoURL = 'mongodb://localhost:27017/moviesdb';
module.exports.mongoSetting = { useNewUrlParser: true };
module.exports.secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secretKey';
