import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { courseValidations } from './courses.validation';
import { CourseControllers } from './courses.controller';
import auth from '../middleware/auth';
import { USER_ROLES } from '../users/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  requestValidation(courseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', auth(USER_ROLES.admin), CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  requestValidation(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  requestValidation(courseValidations.facultiesValidationSchema),
  CourseControllers.createCourseFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  requestValidation(courseValidations.facultiesValidationSchema),
  CourseControllers.removeCourseFaculties,
);
router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
