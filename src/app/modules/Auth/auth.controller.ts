import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { accessToken, refreshToken, needsPasswordChange } = result;
  res.cookie('PHURefreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await authServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { PHURefreshToken } = req.cookies;
  const result = await authServices.getRefreshToken(PHURefreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Refresh token getting successfully',
    data: result,
  });
});
const forgotPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await authServices.forgotPassword(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
};
