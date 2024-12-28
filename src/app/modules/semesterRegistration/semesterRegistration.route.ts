import express from 'express';
import requestValidation from '../middleware/RequestValidation';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  requestValidation(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);
router.get('/', semesterRegistrationControllers.getAllSemesterRegistration);

router.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  requestValidation(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete(
  '/:id',
  requestValidation(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
