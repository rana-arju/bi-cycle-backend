import express from 'express';
import { authController } from './auth.controller';
import validationRequest from '../../middleware/validationRequest';
import { authValidation } from './auth.validation';

const router = express.Router();
router.post(
  '/registration',
  validationRequest(authValidation.registrationSchemaValidation),
  authController.registrationUser,
);
router.post(
  '/login',
  validationRequest(authValidation.loginSchemaValidation),
  authController.loginUser,
);
export const authRoutes = router