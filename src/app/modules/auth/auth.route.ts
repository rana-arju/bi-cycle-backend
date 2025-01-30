import express from 'express';
import { authController } from './auth.controller';
import validationRequest from '../../middleware/validationRequest';
import { authValidation } from './auth.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './auth.interface';

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
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), authController.getMe);
router.get('/users', auth(USER_ROLE.admin), authController.getAllUsers);



export const authRoutes = router;
