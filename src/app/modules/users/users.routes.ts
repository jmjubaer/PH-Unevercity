import express, { NextFunction, Request, Response } from 'express';
import { userController } from './users.controller';
import { studentValidationSchema } from '../students/students.zod.validation';
import requestValidation from '../middleware/RequestValidation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../middleware/auth';
import { userValidations } from './users.validation';
import { upload } from '../../utils/uploadimage';
const router = express.Router();

router.post(
  '/create-student',
  auth('supperAdmin', 'admin', 'faculty'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  requestValidation(studentValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  auth('supperAdmin', 'admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  requestValidation(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  auth('supperAdmin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  requestValidation(createAdminValidationSchema),
  userController.createAdmin,
);

router.get(
  '/me',
  auth('supperAdmin', 'admin', 'faculty', 'student'),
  userController.getMe,
);
router.post(
  '/change-status/:id',
  auth('admin', 'supperAdmin'),
  requestValidation(userValidations.statusChangeValidationSchema),
  userController.changeStatus,
);
export const userRoutes = router;
