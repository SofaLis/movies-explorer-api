const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  celebrate, Joi, errors,
} = require('celebrate');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const auth = require('./middlewares/auth');
const { login, createUser, logoff } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./err/NotFound');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/logoff', logoff);

app.use('/users', auth, userRoutes);
app.use('/movies', auth, movieRoutes);

app.use(errorLogger);
app.use(errors());

app.use('*', (req, res, next) => {
  next(new NotFound('Простите, страница не найдена'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
  next();
});

// eslint-disable-next-line no-console
console.log(process.env.JWT_SECRET);
// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
