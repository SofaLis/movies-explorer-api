const { NODE_ENV, JWT_SECRET, HOST_BD } = process.env;

module.exports.mongoURL = NODE_ENV === 'production' ? HOST_BD : 'mongodb://localhost:27017/moviesdb';
module.exports.mongoSetting = { useNewUrlParser: true };
module.exports.secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secretKey';
