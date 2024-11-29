/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { studentService } from './students.services';
import { studentValidationSchema } from './students.zod.validation';
// joi=====
// import studentSchema from './students.joi.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // const { error,value } = studentSchema.validate(studentData);
    // const result = await studentService.createStudentIntoDb(value);
    const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await studentService.createStudentIntoDb(zodParsedData);
    // joi ====
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Invalid input',
    //     error: error.details,
    //   });
    // }
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.gerAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'All students retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const studentData = req.body;
    const result = await studentService.updateStudentInDb(
      studentId,
      studentData,
    );
    console.log(studentData);
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.deleteStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
