const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser, logoff } = require('../controllers/users');
const { validationSignUp, validationSignIn } = require('../utils/validation');

router.post('/signup', validationSignUp, createUser);
router.post('/signin', validationSignIn, login);
router.post('/logoff', logoff);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
