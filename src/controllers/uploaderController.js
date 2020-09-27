import { createGoogleDriveSlide } from '../services/uploaderService';

/**
 * Controller to upload .ppt or .pptx files
 * @param {Express.Request} req Endpoint request object.
 * @param {Express.Response} res Endpoint response.
 */
const uploadPptOrPptx = async (req, res) => {
  try {
    const { originalname, mimetype, path } = req.file;

    const uploadFile = await createGoogleDriveSlide(originalname, mimetype, path);

    res.status(201).json({
      data: {
        name: originalname,
        status: uploadFile
      },
      message: 'Uploaded succesfully'
    });
  } catch (error) {
    console.log(error);
  }
};

export { uploadPptOrPptx };
