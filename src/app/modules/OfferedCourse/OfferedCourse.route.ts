import express from 'express';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import requestValidation from '../middleware/RequestValidation';
import auth from '../middleware/auth';

const router = express.Router();

router.get(
  '/',
  auth('supperAdmin', 'admin', 'faculty', 'student'),
  OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
  '/:id',
  auth('supperAdmin', 'admin', 'faculty', 'student'),
  OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
  '/create-offered-course',
  auth('supperAdmin', 'admin', 'faculty'),
  requestValidation(
    OfferedCourseValidations.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  auth('supperAdmin', 'admin', 'faculty'),
  requestValidation(
    OfferedCourseValidations.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  auth('supperAdmin', 'admin', 'faculty'),
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;
