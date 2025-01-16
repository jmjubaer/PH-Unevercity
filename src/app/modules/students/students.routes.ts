import express from 'express';
import { studentController } from './students.controller';
import requestValidation from '../middleware/RequestValidation';
import { updateStudentValidationSchema } from './students.zod.validation';
import auth from '../middleware/auth';
const router = express.Router();

router.get(
  '/',
  auth('admin', 'supperAdmin', 'faculty'),
  studentController.getAllStudent,
);
router.get(
  '/:studentId',
  auth('admin', 'supperAdmin', 'faculty'),
  studentController.getSingleStudent,
);
router.put(
  '/:studentId',
  auth('admin', 'supperAdmin', 'faculty'),
  requestValidation(updateStudentValidationSchema),
  studentController.updateStudent,
);
router.delete(
  '/:studentId',
  auth('admin', 'supperAdmin'),
  studentController.deleteStudent,
);
export const studentRoutes = router;
