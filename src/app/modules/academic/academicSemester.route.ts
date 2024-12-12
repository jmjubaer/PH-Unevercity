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
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/academic-semester',
  academicSemesterController.getAllAcademicSemester,
);
router.get(
  '/academic-semester/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);
router.put(
  '/academic-semester/:semesterId',
  academicSemesterController.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
