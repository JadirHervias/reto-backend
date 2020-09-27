import boom from '@hapi/boom';
import joi from 'joi';

const validate = (data, schema) => {
  const { error } = joi.object(schema).validate(data);
  return error;
};

// Schema validation
const validationHandler = (schema, check = 'body') => {
  // Middleware
  return function (req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  };
};

export default validationHandler;
