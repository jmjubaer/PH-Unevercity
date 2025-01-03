import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const {...passwordData} = req.body
  const result = await authServices.changePassword(req.user,passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword
};
