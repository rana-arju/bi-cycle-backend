import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { IUser } from './auth.interface';
import { User } from './auth.model';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';

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
  const user = await User.findOne({ email: payload.email }).select('+password');

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
const getMeFromDB = async (userId: string) => {
  const result = await User.findById(userId);

  return result;
};
const deleteUserFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found!');
  }
  const result = await User.findByIdAndDelete(user._id);
  return result;
};
const userRoleUpdate = async (id: string, role: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found!');
  }
  if (user.role === role) {
    throw new AppError(400, `This user already ${user.role}`);
  }
  const result = await User.findByIdAndUpdate(
    user._id,
    { role },
    { new: true },
  );
  return result;
};
const userStatusUpdate = async (id: string, status: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found!');
  }
  if (user.status === status) {
    throw new AppError(400, `This user already ${user.status}`);
  }
  const result = await User.findByIdAndUpdate(
    user._id,
    { status },
    { new: true },
  );
  return result;
};
const profileUpdate = async (id: string, payload: IUser) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const result = await User.findByIdAndUpdate(
    user._id,
    { ...payload },
    { new: true },
  );

  return result;
};
const passwordChnageIntoDB = async (
  user: JwtPayload,
  passwordData: { oldPassword: string; newPassword: string },
) => {
  const isUser = await User.findById(user?.userId).select('+password');

  if (!isUser) {
    throw new AppError(404, 'User not found');
  }

  //checking is user already deleted
  const isDeleted = isUser?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, 'User already deleted');
  }
  //checking is user blocked or not allowed
  const isBlocked = isUser?.status === 'blocked';
  if (isBlocked) {
    throw new AppError(403, 'User already blocked');
  }
  // checking password is correct

  if (
    !(await User.isPasswordMatched(
      passwordData?.oldPassword,
      isUser?.password as string,
    ))
  ) {
    throw new AppError(403, 'Password mismatch');
  }

  //hash new password
  const newHashPassword = await bcrypt.hash(
    passwordData.newPassword,
    Number(config.salt_rounds),
  );
  await User.findOneAndUpdate(
    {
      id: user?.userId,
      role: user?.role,
    },
    {
      password: newHashPassword,
    },
  );
  return null;
};
//Get All Product
const getAllUsers = async () => {
  const result = await User.find().select('-__v');
  return result;
};
export const authServices = {
  loginUsertIntoDB,
  createUser,
  getMeFromDB,
  getAllUsers,
  deleteUserFromDB,
  userRoleUpdate,
  userStatusUpdate,
  profileUpdate,
  passwordChnageIntoDB,
};
