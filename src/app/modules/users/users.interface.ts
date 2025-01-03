/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLES } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(password: string, hashPassword: string): Promise<boolean>;
  isUserBlocked(status: string): Promise<boolean>;
  isJwtIssuedBeforeChangePassword(
    changePasswordTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLES;
