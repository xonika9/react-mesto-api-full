const express = require('express');

const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', getUserByIdValidation, getUserById);
userRouter.patch('/me', updateProfileValidation, updateUserProfile);
userRouter.patch('/me/avatar', updateAvatarValidation, updateUserAvatar);

module.exports = userRouter;
