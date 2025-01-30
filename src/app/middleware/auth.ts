import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
import catchAsync from '../utils/catchAsync';
import config from '../config';

import AppError from '../error/AppError';
import { User } from '../modules/auth/auth.model';
import { IUserRole } from '../modules/auth/auth.interface';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are unauthorized to access');
    }
    let decoded;
    // if token is valid check
    try {
      decoded = jwt.verify(token, config?.token as string) as JwtPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (error) {
      throw new AppError(401, 'You are unauthorized to access');
    }

    const { role, userId } = decoded;
    const user = await User.findById(userId);

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized to access this resource');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
