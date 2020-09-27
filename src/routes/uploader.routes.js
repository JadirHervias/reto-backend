import { uploadPpt } from '../controllers/uploaderController.js';

export const register = router => {
  router.get('/uploader', uploadPpt);
};
