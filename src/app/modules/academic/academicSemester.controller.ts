import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );

  sendResponse(res, {
    status: 200,
    success: false,
    message: 'Academic semester created successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createStudent: createAcademicSemester,
};
