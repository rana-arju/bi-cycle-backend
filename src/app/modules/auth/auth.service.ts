import config from '../../config';
import AppError from '../../error/AppError';
import { IUser } from './auth.interface';
import { User } from './auth.model';
import { createToken } from './auth.utils';

const createUser = async (payload: IUser) => {
  // user exists or not found

  //const user = await User.findOne({ id: payload?.id }).select('+password');
  const user = await User.findOne({ email: payload.email });

  if (user) {
    //checking is user already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(403, 'User already deleted');
    }
    //checking is user blocked or not allowed
    const isBlocked = user?.status === 'blocked';
    if (isBlocked) {
      throw new AppError(403, 'User already blocked');
    }
  }

  const newUser = await User.create(payload);

  const jwtPayload = {
    userId: newUser?._id,
    role: newUser?.role,
  };

  const refreshToken = createToken(
    jwtPayload,
    config.refresh as string,
    config.refresh_time as string,
  );
  const accessToken = createToken(
    jwtPayload,
    config.token as string,
    config.token_time as string,
  );
  //access granted for login user

  return {
    accessToken,
    refreshToken,
  };
};
const loginUsertIntoDB = async (payload: IUser) => {
  // user exists or not found

  //const user = await User.findOne({ id: payload?.id }).select('+password');
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  //checking is user already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, 'User already deleted');
  }
  //checking is user blocked or not allowed
  const isBlocked = user?.status === 'blocked';
  if (isBlocked) {
    throw new AppError(403, 'User already blocked');
  }
  // checking password is correct
  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  ) {
    throw new AppError(403, 'Password mismatch');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  const refreshToken = createToken(
    jwtPayload,
    config.refresh as string,
    config.refresh_time as string,
  );
  const accessToken = createToken(
    jwtPayload,
    config.token as string,
    config.token_time as string,
  );
  //access granted for login user

  return {
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  loginUsertIntoDB,
  createUser,
};
