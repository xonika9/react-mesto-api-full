const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/ErrorCodes');
const { wrongEmailOrPasswordMessage } = require('../utils/ErrorMessages');
const { avatarUrlRegExp } = require('../utils/AvatarUrlRegExp');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://m.media-amazon.com/images/M/MV5BZDYwYzQxZWUtMDRmYS00ZDc0LTlhYWUtMGIzYjFkNDQ1ZmNlXkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_.jpg',
      validate: {
        validator(link) {
          return avatarUrlRegExp.test(link);
        },
        message: 'Enter a valid URL',
      },
    },
    email: {
      type: String,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Enter a valid email',
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError(wrongEmailOrPasswordMessage);
    })
    .then((user) =>
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(wrongEmailOrPasswordMessage);
        }
        return user;
      }),
    );
};

module.exports = mongoose.model('user', userSchema);
