import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDb = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentsQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await academicDepartmentsQuery.queryModel;
  const meta = await academicDepartmentsQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
