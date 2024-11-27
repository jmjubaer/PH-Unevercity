import { Request, Response } from 'express';
import { studentService } from './students.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    console.log("object");
    const result = await studentService.createStudentIntoDb(student);
    res.status(200).json({
        success: true,
        message: 'Student created successfully',
        data: result,
    });
  } catch (error) {
    console.log(error);
  }
};


const getAllStudent = async(req: Request, res: Response) => {
  try {
    const result = await studentService.gerAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'All students retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log(error);
  }
}

const getSingleStudent = async(req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await studentService.getSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log(error);
  }

}
export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent
};
