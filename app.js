const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errServer } = require('./middlewares/errServer');
const { errNotFound } = require('./middlewares/errNotFound');
const { limiter } = require('./middlewares/limiter');
const { mongoURL, mongoSetting } = require('./utils/config');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

mongoose.connect(mongoURL, mongoSetting);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use('*', errNotFound);

app.use(errServer);

// eslint-disable-next-line no-console
console.log(process.env.JWT_SECRET);
// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
