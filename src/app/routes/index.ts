import { Router } from 'express';
import { studentRoutes } from '../modules/students/students.routes';
import { userRoutes } from '../modules/users/users.routes';
import { academicSemesterRoutes } from '../modules/academic/academicSemester.route';

const router = Router();

const moduleRoute = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students', 
    route: studentRoutes,
  },
  {
    path: '/academic-semester', 
    route: academicSemesterRoutes,
  },
];

moduleRoute.forEach((module) => {
  router.use(module.path, module.route);
});

export default router;
