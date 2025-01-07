import { userServices } from './users.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const file = req.file;
  const { password, student } = req.body;
  const result = await userServices.createStudentIntoDb(
    file,
    password,
    student,
  );
  // res.status(200).json({
  //   success: true,
  //   message: 'Student created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const file = req.file;

  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(
    file,
    password,
    facultyData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const file = req.file;

  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(
    file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await userServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User getting successfully',
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const result = await userServices.changeStatus(status, id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Change user status successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe,
};
