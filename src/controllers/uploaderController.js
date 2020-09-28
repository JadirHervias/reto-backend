import { createGoogleDriveSlide } from '../services/uploaderService';
import httpStatus from 'http-status';

/**
 * Controller to upload .ppt or .pptx files
 * @param {Express.Request} req Endpoint request object.
 * @param {Express.Response} res Endpoint response.
 * @param {import('express').NextFunction} next middleware callback
 */
const uploadPptOrPptx = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { originalname, mimetype, buffer } = req.file;

    const accessToken = authorization.split(' ')[1];

    const { url, data, status, statusText } = await createGoogleDriveSlide(originalname, mimetype, accessToken, buffer);

    if (url && data && status && statusText) {
      res.status(status).json({
        data: {
          url,
          data
        },
        message: statusText === 'OK' ? 'File uploaded succesfully' : statusText,
        status: status
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: httpStatus['401_NAME'],
        message: 'Invalid credentials',
        status: httpStatus.UNAUTHORIZED
      });
    }
  } catch (error) {
    next(error);
  }
};

export { uploadPptOrPptx };
