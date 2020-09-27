import multer from 'multer';
import { uploadPptOrPptx } from '../controllers/uploaderController.js';
// const upload = multer({ storage: multer.memoryStorage() });
const upload = multer({ dest: 'uploads/' });

export const register = router => {
  // TODO: jwt and schema middleware
  router.post('/uploader', upload.single('slide'), uploadPptOrPptx);
};
