/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import config from '../../config';
import { TUser } from './users.interface';
import { User } from './users.model';
import { TStudent } from '../students/students.interface';
import { Student } from '../students/students.model';
import { generateStudentId } from './users.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set  generated id
  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload],{ session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession()
    return newStudent;
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, error.message);
  }
};

export const userServices = {
  createStudentIntoDb,
};
