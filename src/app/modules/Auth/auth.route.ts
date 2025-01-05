import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { AuthValidations } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../middleware/auth';
import { USER_ROLES } from '../users/user.constant';
const router = express.Router();

router.post(
  '/login',
  requestValidation(AuthValidations.loginValidationSchema),
  authController.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLES.admin, USER_ROLES?.faculty, USER_ROLES?.student),
  requestValidation(AuthValidations.changePasswordValidationSchema),
  authController.changePassword,
);
router.post(
  '/refresh-token',
  requestValidation(AuthValidations.refreshTokenValidationSchema),
  authController.refreshToken,
);
router.post(
  '/forgot-password',
  requestValidation(AuthValidations.forgotPasswordValidationSchema),
  authController.forgotPassword,
);
export const AuthRoutes = router;
