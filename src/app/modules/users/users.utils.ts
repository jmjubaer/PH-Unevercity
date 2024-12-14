// year semesterCode 4digit number

import { TAcademicSemester } from '../academic/academicSemester.interface';
import { User } from './users.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  const currentStudentYear = payload.year;
  const currentStudentCode = payload.code;
  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentCode === currentStudentCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
