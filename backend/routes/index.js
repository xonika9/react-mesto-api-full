const express = require('express');

const router = express.Router();
const {
  login, createUser, checkToken, logout,
} = require('../controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/validation');
const { NotFoundError } = require('../utils/ErrorCodes');
const { pageNotFoundMessage } = require('../utils/ErrorMessages');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server is about to crash');
  }, 0);
});

router.use(express.json());

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.get('/checktoken', checkToken);
router.use(auth);
router.get('/logout', logout);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;
