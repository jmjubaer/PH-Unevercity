import { TStudent } from './students.interface';
import { Student } from './students.model';

const createStudentIntoDb = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData); // built in static method

  // built in instance method ==============================
  const studentInstance = new Student(studentData); // create a instance by StudentModel class.

  // custom method ==============================
  if (await studentInstance.isUserExists(studentData.id)) {
    throw new Error('Student ID already exists');
  }

  // built in instance method ==============================
  const result = await studentInstance.save(); // save the instance into database.  // save() returns promise.

  return result;
};

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
  createStudentIntoDb,
  gerAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentInDb,
};
