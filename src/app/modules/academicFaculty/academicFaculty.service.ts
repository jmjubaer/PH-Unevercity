import { AcademicFaculty } from './academicFaculty.model';
import { TAcademicFaculty } from './academicFaculty.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDb = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await academicFacultyQuery.queryModel;
  const meta = await academicFacultyQuery.countTotal();
  return { result, meta };
};

const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  updateAcademicFacultyIntoDb,
};
