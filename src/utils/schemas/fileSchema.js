import joi from 'joi';

const fileSchema = {
  fieldname: joi.string().equal('slide').required(),
  originalname: joi.string().required(),
  encoding: joi.string(),
  mimetype: joi
    .allow('application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    .required(),
  buffer: joi.binary().max(100000000).required(),
  size: joi.number().max(100000000)
};

export { fileSchema };
