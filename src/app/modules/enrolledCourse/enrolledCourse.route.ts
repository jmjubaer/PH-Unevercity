import express from 'express';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import auth from '../middleware/auth';
import requestValidation from '../middleware/RequestValidation';
import { EnrolledCourseValidations } from './enrolledCourse.validation';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  requestValidation(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  requestValidation(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);
router.get(
  '/',
  auth('faculty', 'admin'),
  EnrolledCourseControllers.getAllEnrolledCourser,
);
router.get(
  '/my-enrolled-course',
  auth('student'),
  EnrolledCourseControllers.getMyEnrolledCourse,
);
router.get(
  '/my-course',
  auth('faculty'),
  EnrolledCourseControllers.getAllFacultyCourse,
);

export const EnrolledCourseRoutes = router;
