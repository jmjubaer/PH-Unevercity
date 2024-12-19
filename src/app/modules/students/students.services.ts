/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { TStudent } from './students.interface';
import { Student } from './students.model';
import AppError from '../../errors/AppError';
import { User } from '../users/users.model';

const gerAllStudentFromDb = async () => {
  const result = await Student.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id }); // use findOne method
  const result = await Student.aggregate([{ $match: { id: id } }]); // use aggregate method
  return result;
};

const updateStudentInDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...restStudentData } = payload;
  const modifiedStudent: Record<string, unknown> = { ...restStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudent[`name.${key}`] = value;
    }
  }
  //guardian
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudent[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudent[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id: id }, modifiedStudent);
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  const isUserExists = await User.findOne({ id });
  if (!isUserExists) {
    throw new AppError(404, 'Student not found');
  }
  try {
    session.startTransaction();
    const userDeleted = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!userDeleted) {
      throw new AppError(400, 'Failed to delete user');
    }
    const studentDeleted = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!studentDeleted) {
      throw new AppError(400, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return studentDeleted;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, error.message);
  }
};

export const studentService = {
  gerAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentInDb,
};
