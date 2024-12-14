import { Router } from 'express';
import { studentRoutes } from '../modules/students/students.routes';
import { userRoutes } from '../modules/users/users.routes';
import { academicSemesterRoutes } from '../modules/academic/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

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
  {
    path: '/academic-faculties',  
    route: academicFacultyRoutes,
  },
];

moduleRoute.forEach((module) => {
  router.use(module.path, module.route);
});

export default router;
