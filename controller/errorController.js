const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"([^"]*)"/)[0];
  const message = `Duplicate field value: ${value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${error.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other known error: don't leak error details to client
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const sendErrorDev = (err, res) => {
  // console.log('Detailed Error:', err); // Log the full error for debugging
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error); // Handle specific DB errors
    }

    if (err.code == 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    sendErrorProd(error, res);
  }
};
