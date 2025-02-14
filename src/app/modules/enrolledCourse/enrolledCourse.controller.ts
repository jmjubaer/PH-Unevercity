import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });
});

const getMyEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.myEnrolledCourseFromDB(
    userId,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get my enrolled course successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllEnrolledCourser = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCourserFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all enrolled course successfully',
    meta: result.meta,
    data: result.result,
  });
});
const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Marks is updated succesfully',
    data: result,
  });
});

const getAllFacultyCourse = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.getFacultyCourseFromDB(
    facultyId,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all faculty courses successfully',
    meta: result.meta,
    data: result.result,
  });
});
export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getAllEnrolledCourser,
  getMyEnrolledCourse,
  getAllFacultyCourse,
};
