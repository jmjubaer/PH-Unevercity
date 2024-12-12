import { ObjectId } from 'mongodb';
import { academicSemesterNameCodeMapper } from './academicDemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSemister.interface';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDb = async () => {
  
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDb = async (id: string) => {
  
  const result = await AcademicSemester.findOne({_id: new ObjectId(id)});
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb
};
