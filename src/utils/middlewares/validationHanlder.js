import boom from '@hapi/boom';
import joi from 'joi';

const validate = (data, schema) => {
  const { value } = joi.object(schema).validate(data);

  return value;
};

// Schema validation
const validationHandler = (schema, check) => {
  // Middleware
  return function (req, res, next) {
    const requestPart = req[check];

    const valid = validate(requestPart, schema);

    if (!valid || !requestPart) {
      const error = boom.badRequest('Schema error', true);

      const { statusCode, message } = error.output.payload;

      res.status(statusCode).json({
        error: message,
        status: statusCode,
        message
      });

      next(boom.badRequest(error));
    }

    next();
  };
};

// Headers validation
const hasAccessToken = (reqType, check = 'authorization') => {
  return function (req, res, next) {
    const noAccessToken = !req[reqType][check] ? true : false;

    if (noAccessToken) {
      const error = boom.badRequest('No access token found', true);

      const { statusCode, message } = error.output.payload;
      res.status(statusCode).json({
        error: message,
        status: statusCode,
        message
      });

      next(error);
    }

    next();
  };
};

export { validationHandler, hasAccessToken };
