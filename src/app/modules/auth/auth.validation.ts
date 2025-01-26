import { z } from 'zod';

const loginSchemaValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const registrationSchemaValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const changePasswordSchemaValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New Password is required',
    }),
  }),
});

const refreshTokenValidations = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const authValidation = {
  loginSchemaValidation,
  changePasswordSchemaValidation,
  refreshTokenValidations,
  registrationSchemaValidation,
};
