/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./users.service";

const createStudent = async (req: Request, res: Response) => {
    try {
      const { student } = req.body;
  
      const result = await userServices.createStudentIntoDb(student);
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

export const userController = {
    createStudent
}