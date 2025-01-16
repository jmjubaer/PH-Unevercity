import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Academic faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDb(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Get academic faculty successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const facultyId = req.params.facultyId;
  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Get single academic faculty successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const facultyId = req.params.facultyId;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDb(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Update academic faculty successfully',
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
