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
  auth(
    USER_ROLES.admin,
    USER_ROLES?.faculty,
    USER_ROLES?.student,
    USER_ROLES.supperAdmin,
  ),
  requestValidation(AuthValidations.changePasswordValidationSchema),
  authController.changePassword,
);
router.post(
  '/refresh-token',
  auth(
    USER_ROLES.admin,
    USER_ROLES?.faculty,
    USER_ROLES?.student,
    USER_ROLES.supperAdmin,
  ),
  requestValidation(AuthValidations.refreshTokenValidationSchema),
  authController.refreshToken,
);
router.post(
  '/forgot-password',
  auth(
    USER_ROLES.admin,
    USER_ROLES?.faculty,
    USER_ROLES?.student,
    USER_ROLES.supperAdmin,
  ),
  requestValidation(AuthValidations.forgotPasswordValidationSchema),
  authController.forgotPassword,
);
router.post(
  '/reset-password',
  
  requestValidation(AuthValidations.resetPasswordValidationSchema),
  authController.resetPassword,
);
export const AuthRoutes = router;
