import multer from 'multer';
import { uploadPptOrPptx } from '../controllers/uploaderController.js';
import validationHandler from '../utils/middlewares/validationHanlder';
import { fileSchema, uploadFileSchema } from '../utils/schemas/fileSchema';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const register = router => {
  // TODO: jwt and schema middleware
  router.post(
    '/uploader',
    // validationHandler(uploadFileSchema, ''),
    upload.single('slide'),
    uploadPptOrPptx
  );
};
