import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  // will call service func to send this data

  const result = await authServices.loginUsertIntoDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user logged in successful',
    data: {
      accessToken,
    },
  });
});
const registrationUser = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await authServices.createUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  // send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user registration in successful',
    data: {
      accessToken,
    },
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user as JwtPayload;
console.log(req.user);

  const result = await authServices.getMeFromDB(userId);
console.log("result", result);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'get me succesfully',
    data: result,
  });
});
export const authController = {
  loginUser,
  registrationUser,
  getMe,
};
