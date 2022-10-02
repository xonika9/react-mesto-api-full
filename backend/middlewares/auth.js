const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/ErrorCodes');
const { authorizationErrorMessage } = require('../utils/ErrorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return next(new UnauthorizedError(authorizationErrorMessage));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
