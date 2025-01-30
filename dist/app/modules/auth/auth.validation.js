"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const registrationSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.string({
            required_error: 'Password is required',
        }),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
    }),
});
const changePasswordSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New Password is required',
        }),
    }),
});
const refreshTokenValidations = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.authValidation = {
    loginSchemaValidation,
    changePasswordSchemaValidation,
    refreshTokenValidations,
    registrationSchemaValidation,
};
