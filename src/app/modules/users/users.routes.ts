import express from 'express';
import { userController } from './users.controller';
import { studentValidationSchema } from '../students/students.zod.validation';
import requestValidation from '../middleware/RequestValidation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
const router = express.Router();

router.post(
  '/create-student',
  requestValidation(studentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  requestValidation(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  requestValidation(createAdminValidationSchema),
  userController.createAdmin,
);
export const userRoutes = router;
