import { TStudent } from './students.interface';
import { Student } from './students.model';


const gerAllStudentFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id }); // use findOne method
  const result = await Student.aggregate([{ $match: { id: id } }]); // use aggregate method
  return result;
};

const updateStudentInDb = async (id: string, updatedData: TStudent) => {
  const result = await Student.updateOne(
    { id: id },
    {
      $set: {
        ...updatedData,
      },
    },
  );
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentService = {
  gerAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentInDb,
};
