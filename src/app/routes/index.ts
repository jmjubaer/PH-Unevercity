import { Router } from 'express';
import { studentRoutes } from '../modules/students/students.routes';
import { userRoutes } from '../modules/users/users.routes';

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
];

moduleRoute.forEach((module) => {
  router.use(module.path, module.route);
});

export default router;
