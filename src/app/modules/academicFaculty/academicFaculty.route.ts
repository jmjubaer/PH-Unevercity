import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { academicFacultyValidations } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';
import auth from '../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth('admin','supperAdmin'),
  requestValidation(
    academicFacultyValidations.academicFacultyValidationSchema
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get(
  '/',
  auth('admin','faculty','supperAdmin'),
  academicFacultyControllers.getAllAcademicFaculty,
);
router.get(
  '/:facultyId',
  auth('admin','supperAdmin'),
  academicFacultyControllers.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  auth('admin','supperAdmin'),
  requestValidation(
    academicFacultyValidations.academicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
