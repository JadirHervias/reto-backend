import { login } from '../controllers/authController';

export const register = router => {
  router.post('auth/login', login);
};
