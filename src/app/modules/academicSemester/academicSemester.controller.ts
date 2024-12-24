import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Get academic semester successfully',
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDb(semesterId);

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Get academic semester successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDb(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Get academic semester successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
