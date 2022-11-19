// backend/utils/validation.js
const { validationResult } = require('express-validator');

const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      // myLocation: error.location,
      statusCode: error.statusCode || 400
    };
  },
});

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  // const validationErrors = myValidationResult(req);
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {

    let errors = {};
    validationErrors.array().forEach((error) => errors[error.param] = error.msg);

    const err = Error('Validation error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Validation error';
    err.statusCode = 400
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
