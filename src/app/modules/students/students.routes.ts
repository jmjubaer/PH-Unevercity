import express from 'express';
import { studentController } from './students.controller';
import requestValidation from '../middleware/RequestValidation';
import { updateStudentValidationSchema } from './students.zod.validation';
const router = express.Router();

router.get('/', studentController.getAllStudent);
router.get('/:studentId', studentController.getSingleStudent);
router.put(
  '/:studentId',
  requestValidation(updateStudentValidationSchema),
  studentController.updateStudent,
);
router.delete('/:studentId', studentController.deleteStudent);
export const studentRoutes = router;
