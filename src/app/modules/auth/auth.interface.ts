/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  phone: string;
  role: 'customer' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextpassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
export const USER_ROLE = {
  customer: 'customer',
  admin: 'admin',
} as const;
export type IUserRole = keyof typeof USER_ROLE;
