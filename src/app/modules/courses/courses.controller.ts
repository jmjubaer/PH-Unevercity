// import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './courses.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCoursesFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);
  // console.log(req.cookies);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.updateCoursesIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCoursesFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

const createCourseFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.createCourseFacultyIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Assign faculty is successfully',
    data: result,
  });
});
const getCourseFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getCourseFacultyFromDb(courseId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get course faculty is successfully',
    data: result,
  });
});

const removeCourseFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.removeCourseFacultyFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Remove faculty is successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  createCourseFaculties,
  removeCourseFaculties,
  getCourseFaculties,
};
