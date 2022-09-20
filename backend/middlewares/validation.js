const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { avatarUrlRegExp } = require('../utils/AvatarUrlRegExp');

const idValidationMethod = (value, helper) => (mongoose.isValidObjectId(value) ? value : helper.message('Wrong id format'));

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(avatarUrlRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(idValidationMethod),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(avatarUrlRegExp),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(avatarUrlRegExp),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(idValidationMethod),
  }),
});

const likeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(idValidationMethod),
  }),
});

const dislikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(idValidationMethod),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
};
