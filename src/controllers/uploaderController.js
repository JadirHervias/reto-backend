import { createGoogleDriveSlide } from '../services/uploaderService';

/**
 * Controller to upload .ppt or .pptx files
 * @param {Express.Request} req Endpoint request object.
 * @param {Express.Response} res Endpoint response.
 */
const uploadPptOrPptx = async (req, res) => {
  try {
    // console.log(req);

    // const bearerToken = req.headers.authorization;
    // const accessToken = bearerToken.split(' ')[1];
    // console.log(accessToken);

    const userCredentials = req.body;

    // const verificationCode = req.body.code;

    // console.log('verification code!!!!' + verificationCode);

    const { originalname, mimetype, buffer } = req.file;

    const uploadFile = await createGoogleDriveSlide(originalname, mimetype, userCredentials, buffer);

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
