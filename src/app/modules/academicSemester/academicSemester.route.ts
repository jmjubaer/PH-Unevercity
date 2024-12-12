import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import requestValidation from '../middleware/RequestValidation';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  requestValidation(
    academicSemesterValidations.academicSemesterValidationSchema,
  ),
  academicSemesterController.createStudent,
);

export const academicSemesterRoutes = router;
