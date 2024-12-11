/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentService } from './students.services';
import catchAsync from '../../utils/catchAsync';

// import { studentValidationSchema } from './students.zod.validation';
// joi=====
// import studentSchema from './students.joi.validation';
// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     // const { error,value } = studentSchema.validate(studentData);
//     // const result = await studentService.createStudentIntoDb(value);
//     const zodParsedData = studentValidationSchema.parse(studentData);

//     const result = await studentService.createStudentIntoDb(zodParsedData);
//     // joi ====
//     // if (error) {
//     //   res.status(400).json({
//     //     success: false,
//     //     message: 'Invalid input',
//     //     error: error.details,
//     //   });
//     // }
//     res.status(200).json({
//       success: true,
//       message: 'Student created successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       error: error,
//     });
//   }
// };


const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentService.gerAllStudentFromDb();
  res.status(200).json({
    success: true,
    message: 'All students retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await studentService.getSingleStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'Single student retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const studentData = req.body;
  const result = await studentService.updateStudentInDb(studentId, studentData);
  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await studentService.deleteStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'Single deleted successfully',
    data: result,
  });
});
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
