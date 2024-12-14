import { AcademicFaculty } from './academicFaculty.model';
import { TAcademicFaculty } from './academicFaculty.interface';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {

  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDb = async () => {
  const result = await AcademicFaculty.find();
  return result;
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
