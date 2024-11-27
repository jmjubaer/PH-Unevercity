import { Student } from "./students.interface";
import { StudentModel } from "./students.model";

const createStudentIntoDb = async(student: Student) => {
    const result = await StudentModel.create(student);
    return result;
}

const gerAllStudentFromDb = async() => {
    const result = await StudentModel.find();
    return result;
}

const getSingleStudentFromDb = async(id: string) => {
    const result = await StudentModel.findOne({id})
    return result;
}
export const studentService = {
    createStudentIntoDb,
    gerAllStudentFromDb,
    getSingleStudentFromDb
}