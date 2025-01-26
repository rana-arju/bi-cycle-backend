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
export const authController = {
  loginUser,
};
