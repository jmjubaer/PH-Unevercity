/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import config from '../../config';
import { TUser } from './users.interface';
import { User } from './users.model';
import { TStudent } from '../students/students.interface';
import { Student } from '../students/students.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { Admin } from '../Admin/admin.model';
import { verifyToken } from '../Auth/auth.utils';
import { USER_ROLES } from './user.constant';
import { uploadImageIntoCloudinary } from '../../utils/uploadimage';

const createStudentIntoDb = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.email = payload?.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set  generated id
  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  //set  generated id
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    if (file) {
      const imageName = `${payload?.name?.firstName}-${userData?.id}`;

      const { secure_url } = await uploadImageIntoCloudinary(
        file?.path,
        imageName,
      );
      payload.profileImg = secure_url;
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, error);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  userData.email = payload?.email;
  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    if (file) {
      const imageName = `${payload?.name?.firstName}-${userData?.id}`;

      const { secure_url } = await uploadImageIntoCloudinary(
        file?.path,
        imageName,
      );
      payload.profileImg = secure_url;
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload?.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }
    if (file) {
      const imageName = `${payload?.name?.firstName}-${userData?.id}`;

      const { secure_url } = await uploadImageIntoCloudinary(
        file?.path,
        imageName,
      );
      payload.profileImg = secure_url;
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(500, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === USER_ROLES.student) {
    result = await Student.findOne({ id: userId }).populate('user');
  } else if (role === USER_ROLES.faculty) {
    result = await Faculty.findOne({ id: userId }).populate('user');
  } else if (role === USER_ROLES.admin) {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  return result;
};
const changeStatus = async (status: string, id: string) => {
  // const isUserExist
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const result = await User.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};
export const userServices = {
  createStudentIntoDb,
  createFacultyIntoDB,
  createAdminIntoDB,
  changeStatus,
  getMe,
};
