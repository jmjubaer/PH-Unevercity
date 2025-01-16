import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { courseValidations } from './courses.validation';
import { CourseControllers } from './courses.controller';
import auth from '../middleware/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin', 'faculty', 'supperAdmin'),
  requestValidation(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/',
  auth('admin', 'faculty', 'student', 'supperAdmin'),
  CourseControllers.getAllCourses,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student', 'supperAdmin'),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth('admin', 'faculty', 'supperAdmin'),
  requestValidation(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth('admin', 'supperAdmin'),
  requestValidation(courseValidations.facultiesValidationSchema),
  CourseControllers.createCourseFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  auth('admin', 'supperAdmin'),
  requestValidation(courseValidations.facultiesValidationSchema),
  CourseControllers.removeCourseFaculties,
);
router.get(
  '/:courseId/get-faculties',
  auth('admin', 'faculty', 'student', 'supperAdmin'),
  CourseControllers.getCourseFaculties,
);
router.delete(
  '/:id',
  auth('admin', 'supperAdmin'),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;
