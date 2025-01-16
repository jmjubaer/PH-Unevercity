import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { academicDepartmentValidations } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';
import auth from '../middleware/auth';

const router = express.Router();
// create data api
router.post(
  '/create-academic-department',
  auth('admin', 'faculty', 'supperAdmin'),
  requestValidation(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);
//get all data api
router.get(
  '/',
  auth('admin', 'faculty', 'supperAdmin', 'student'),
  academicDepartmentControllers.getAllAcademicDepartment,
);
// get single data api
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);
// update data api
router.patch(
  '/:departmentId',
  auth('admin','faculty','supperAdmin'),
  requestValidation(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
