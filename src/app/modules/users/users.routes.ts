import express from 'express';
import { userController } from './users.controller';
import { studentValidationSchema } from '../students/students.zod.validation';
import requestValidation from '../middleware/RequestValidation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../middleware/auth';
import { USER_ROLES } from './user.constant';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLES.admin),
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
export const userRoutes = router;
