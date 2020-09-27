import { loginWithGoogle, googleVerification } from '../controllers/authController';

export const register = router => {
  // router.post('/auth/login', login);
  router.get('/auth/google/login', loginWithGoogle);
  router.get('/auth/google/callback', googleVerification);
};
