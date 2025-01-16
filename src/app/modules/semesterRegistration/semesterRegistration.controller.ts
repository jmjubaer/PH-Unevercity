import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDb(
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester registration successfully',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationServices.getAllSemesterRegistration(
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester registration getting successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistration(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single semester registration getting successfully',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await semesterRegistrationServices.updateSemesterRegistration(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update semester registration successfully',
    data: result,
  });
});
const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.deleteSemesterRegistration(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete semester registration successfully',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
