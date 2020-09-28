import joi from 'joi';

const accessTokenSchema = joi.string().required();

export { accessTokenSchema };
