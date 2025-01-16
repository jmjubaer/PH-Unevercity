import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import requestValidation from '../middleware/RequestValidation';
import auth from '../middleware/auth';

const router = express.Router();

router.get(
  '/:id',
  auth('admin', 'supperAdmin', 'faculty'),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  auth('admin', 'supperAdmin'),
  requestValidation(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',
  auth('admin', 'supperAdmin'),
  FacultyControllers.deleteFaculty,
);

router.get(
  '/',
  auth('admin', 'supperAdmin', 'faculty'),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
