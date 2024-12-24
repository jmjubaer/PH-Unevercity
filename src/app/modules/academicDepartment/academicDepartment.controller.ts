import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { academicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentsFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Get academic department successfully',
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const departmentId = req.params.departmentId;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDb(
      departmentId,
    );

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Get single academic department successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const departmentId = req.params.departmentId;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDb(
      departmentId,
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: false,
    message: 'Update academic department successfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
