import config from '../../config';
import { TUser } from './users.interface';
import { User } from './users.model';
import { TStudent } from '../students/students.interface';
import { Student } from '../students/students.model';
import { generateStudentId } from './users.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import AppError from '../../errors/AppError';

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
    throw new AppError(400,'Admission semester not found');
  }
  userData.id = await generateStudentId(admissionSemester);
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDb,
};
