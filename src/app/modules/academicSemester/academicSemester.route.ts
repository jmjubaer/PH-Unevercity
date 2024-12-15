import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import requestValidation from '../middleware/RequestValidation';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  requestValidation(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/',
  academicSemesterController.getAllAcademicSemester,
);
router.get(
  '/academic-semester/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/academic-semester/:semesterId',
  requestValidation(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
