import express from 'express';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import requestValidation from '../middleware/RequestValidation';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth('supperAdmin'), AdminControllers.getAllAdmins);

router.get('/:id', auth('supperAdmin'), AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  auth('supperAdmin'),
  requestValidation(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', auth('supperAdmin'), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
