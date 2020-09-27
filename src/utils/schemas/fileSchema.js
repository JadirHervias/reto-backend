import joi from 'joi';

const fileSchema = joi.binary();

const uploadFileSchema = {
  file: fileSchema.label('slide').required()
};

export { fileSchema, uploadFileSchema };
