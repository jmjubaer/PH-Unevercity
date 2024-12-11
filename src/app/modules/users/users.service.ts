import config from '../../config';
import { TUser } from './users.interface';
import { User } from './users.model';
import { TStudent } from '../students/students.interface';
import { Student } from '../students/students.model';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.id = '2030100001';
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDb,
};
