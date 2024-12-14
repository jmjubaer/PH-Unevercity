import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { academicFacultyValidations } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  requestValidation(
    academicFacultyValidations.academicFacultyValidationSchema
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get(
  '/',
  academicFacultyControllers.getAllAcademicFaculty,
);
router.get(
  '/:facultyId',
  academicFacultyControllers.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  requestValidation(
    academicFacultyValidations.academicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
