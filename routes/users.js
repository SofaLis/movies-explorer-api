const router = require('express').Router();
const { getUsersMe, updateUser } = require('../controllers/users');
const { validationUser } = require('../utils/validation');

router.get('/me', getUsersMe);

router.patch('/me', validationUser, updateUser);

module.exports = router;
