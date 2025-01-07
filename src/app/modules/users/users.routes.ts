import express, { NextFunction, Request, Response } from 'express';
import { userController } from './users.controller';
import { studentValidationSchema } from '../students/students.zod.validation';
import requestValidation from '../middleware/RequestValidation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../middleware/auth';
import { USER_ROLES } from './user.constant';
import { userValidations } from './users.validation';
import { upload } from '../../utils/uploadimage';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLES.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  requestValidation(studentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLES.admin),
  requestValidation(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  requestValidation(createAdminValidationSchema),
  userController.createAdmin,
);

router.get('/me', auth('admin', 'faculty', 'student'), userController.getMe);
router.post(
  '/change-status/:id',
  auth('admin'),
  requestValidation(userValidations.statusChangeValidationSchema),
  userController.changeStatus,
);
export const userRoutes = router;
