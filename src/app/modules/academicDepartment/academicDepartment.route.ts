import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { academicDepartmentValidations } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();
// create data api
router.post(
  '/create-academic-department',
  requestValidation(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);
//get all data api
router.get('/', academicDepartmentControllers.getAllAcademicDepartment);
// get single data api
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);
// update data api
router.patch(
  '/:departmentId',
  requestValidation(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
