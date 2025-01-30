"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const auth_model_1 = require("./auth.model");
const auth_utils_1 = require("./auth.utils");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // user exists or not found
    //const user = await User.findOne({ id: payload?.id }).select('+password');
    const user = yield auth_model_1.User.findOne({ email: payload.email });
    if (user) {
        //checking is user already deleted
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(403, 'User already deleted');
        }
        //checking is user blocked or not allowed
        const isBlocked = (user === null || user === void 0 ? void 0 : user.status) === 'blocked';
        if (isBlocked) {
            throw new AppError_1.default(403, 'User already blocked');
        }
    }
    const newUser = yield auth_model_1.User.create(payload);
    const jwtPayload = {
        userId: newUser === null || newUser === void 0 ? void 0 : newUser._id,
        role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
    };
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.refresh, config_1.default.refresh_time);
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token, config_1.default.token_time);
    //access granted for login user
    return {
        accessToken,
        refreshToken,
    };
});
const loginUsertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // user exists or not found
    //const user = await User.findOne({ id: payload?.id }).select('+password');
    const user = yield auth_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    //checking is user already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(403, 'User already deleted');
    }
    //checking is user blocked or not allowed
    const isBlocked = (user === null || user === void 0 ? void 0 : user.status) === 'blocked';
    if (isBlocked) {
        throw new AppError_1.default(403, 'User already blocked');
    }
    // checking password is correct
    if (!(yield auth_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(403, 'Password mismatch');
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.refresh, config_1.default.refresh_time);
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.token, config_1.default.token_time);
    //access granted for login user
    return {
        accessToken,
        refreshToken,
    };
});
const getMeFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById(userId);
    return result;
});
//Get All Product
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.find().select('-__v');
    return result;
});
exports.authServices = {
    loginUsertIntoDB,
    createUser,
    getMeFromDB,
    getAllUsers,
};
