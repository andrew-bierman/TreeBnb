// backend/utils/validation.js
const { validationResult } = require('express-validator');

const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      myLocation: error.location,
      statusCode: statusCode
    };
  },
});

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = myValidationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Validation error');
    err.statusCode = '400'
    err.errors = errors;
    err.status = 400;
    err.title = 'Validation error';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
