import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import requestValidation from '../middleware/RequestValidation';
import { academicSemesterValidations } from './academicSemester.validation';
import auth from '../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin','supperAdmin'),
  requestValidation(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/',
  auth('admin','supperAdmin','faculty','student'),
  academicSemesterController.getAllAcademicSemester,
);
router.get(
  '/academic-semester/:semesterId',
  auth('admin','supperAdmin','faculty','student'),
  academicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/academic-semester/:semesterId',
  auth('admin','supperAdmin'),
  requestValidation(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
