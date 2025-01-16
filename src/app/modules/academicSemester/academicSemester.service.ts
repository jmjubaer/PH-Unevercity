import { ObjectId } from 'mongodb';
import { academicSemesterNameCodeMapper } from './academicsemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSemester.interface';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDb = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await academicSemesterQuery.queryModel;
  const meta = await academicSemesterQuery.countTotal();
  return { result, meta };
};

const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: new ObjectId(id) });
  return result;
};
const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(404, 'Invalid Semester Code');
  }
  // const result = await AcademicSemester.updateOne(
  //   { _id: new ObjectId(id) },
  //   {
  //     $set: {
  //       ...payload,
  //     },
  //   },
  // );
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
};
