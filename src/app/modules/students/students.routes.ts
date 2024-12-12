import express from 'express';
import { studentController } from './students.controller';
const router = express.Router();

router.get('/', studentController.getAllStudent);
router.get('/:studentId', studentController.getSingleStudent);
router.put('/:studentId', studentController.updateStudent);
router.delete('/:studentId', studentController.deleteStudent);
export const studentRoutes = router;
