import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../users/users.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from './auth.utils';
import { sendMail } from '../../utils/sendMail';
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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10h',
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    '365d',
  );

  return {
    accessToken,
    refreshToken,
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
const getRefreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;
  const user = await User.isUserExistByCustomId(userId);
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

  if (
    user?.passwordChangedAt &&
    User.isJwtIssuedBeforeChangePassword(user?.passwordChangedAt, iat as number)
  ) {
    throw new AppError(401, 'You are not authorized');
  }
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '1d',
  );
  return accessToken;
};
const forgotPassword = async (userId: string) => {
  const user = await User.isUserExistByCustomId(userId);
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

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );
  const forgotPasswordUILink = `http://localhost:3000?id=${user?.id}&token=${resetToken}`;
  sendMail(user?.email, forgotPasswordUILink);
  return {
    forgotPasswordUILink,
  };
};
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistByCustomId(payload.id);
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
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (decoded?.userId !== payload?.id) {
    throw new AppError(401, 'Forbidden access denied');
  }
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );
  await User.findOneAndUpdate(
    { id: decoded?.userId, role: decoded?.role },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return { message: 'Password reset successfully' };
};
export const authServices = {
  loginUser,
  changePassword,
  getRefreshToken,
  forgotPassword,
  resetPassword,
};
