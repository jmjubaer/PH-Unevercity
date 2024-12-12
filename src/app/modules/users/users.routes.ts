import express from 'express';
import { userController } from './users.controller';
import { studentValidationSchema } from '../students/students.zod.validation';
import requestValidation from '../middleware/RequestValidation';
const router = express.Router();


router.post(
  '/create-student',
  requestValidation(studentValidationSchema),
  userController.createStudent,
);
export const userRoutes = router;
