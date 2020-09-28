import multer from 'multer';
import { uploadPptOrPptx } from '../controllers/uploaderController.js';
import { validationHandler, hasAccessToken } from '../utils/middlewares/validationHanlder';
import { fileSchema } from '../utils/schemas/fileSchema';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const register = router => {
  router.post(
    '/uploader',
    upload.single('slide'),
    hasAccessToken('headers'), // Check access token
    validationHandler(fileSchema, 'file'),
    uploadPptOrPptx
  );
};
