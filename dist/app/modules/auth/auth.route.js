"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_interface_1 = require("./auth.interface");
const router = express_1.default.Router();
router.post('/registration', (0, validationRequest_1.default)(auth_validation_1.authValidation.registrationSchemaValidation), auth_controller_1.authController.registrationUser);
router.post('/login', (0, validationRequest_1.default)(auth_validation_1.authValidation.loginSchemaValidation), auth_controller_1.authController.loginUser);
router.get('/me', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin, auth_interface_1.USER_ROLE.user), auth_controller_1.authController.getMe);
exports.authRoutes = router;
