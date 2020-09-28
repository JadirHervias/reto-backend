import boom from '@hapi/boom';
import config from '../../config';

// For development mode
const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
};

export const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};

// Check boom errors
export const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
};

// Middleware
export const errorHandler = (err, req, res, next) => {
  // Get error output
  const {
    output: { statusCode, payload }
  } = err;

  res.status(statusCode).json(withErrorStack(payload, err.stack));
};
