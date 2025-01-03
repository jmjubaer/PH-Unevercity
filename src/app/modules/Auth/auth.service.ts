import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../users/users.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload?.id);
  if (!user) {
    throw new AppError(404, 'User does not exist');
  }
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(401, 'User does not available');
  }
  if (await User.isUserBlocked(user?.status)) {
    throw new AppError(409, 'User is blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(401, 'Incorrect password');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config?.jwt_access_secret as string,
    {
      expiresIn: '30d',
    },
  );
  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.isUserExistByCustomId(userData?.userId);
  if (!user) {
    throw new AppError(404, 'User does not exist');
  }
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(401, 'User does not available');
  }
  if (await User.isUserBlocked(user?.status)) {
    throw new AppError(409, 'User is blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(401, 'Incorrect password');
  }
  if (payload?.oldPassword === payload.newPassword) {
    throw new AppError(401, 'Password is same as old password');
  }
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );
  await User.findOneAndUpdate(
    { id: userData?.userId, role: userData?.role },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return { message: 'Password changed successfully' };
};
export const authServices = {
  loginUser,
  changePassword,
};
