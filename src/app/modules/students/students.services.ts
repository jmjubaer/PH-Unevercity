import mongoose from 'mongoose';
import { TStudent } from './students.interface';
import { Student } from './students.model';
import AppError from '../../errors/AppError';
import { User } from '../users/users.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchAbleField } from './students.constant';

const gerAllStudentFromDb = async (query: Record<string, unknown>) => {
  /*
  const queryObj = { ...query };
  let searchTerm = '';
  const searchAbleField = ['email', 'name.firstName', 'presentAddress'];
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  // remove search term from the query
  // search query
  const SearchQuery = Student.find({
    $or: searchAbleField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeField = ['searchTerm', 'sort', 'limit', 'page','fields'];
  excludeField.forEach((elm) => delete queryObj[elm]);

  //database operations
  const FilterQuery = SearchQuery.find(queryObj)
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');

  let sort = '-id';
  if (query.sort) {
    sort = query.sort as string;
  }

  const SortQuery = FilterQuery.sort(sort);
  let limit = 1;
  let page = 1; 
  let skip = 0;
  if (query.page) {
    page = query.page as number;
    skip = (page - 1) * limit;
  }

  if (query.limit) {
    limit = query.limit as number;
  }
  const paginateQuery = SortQuery.skip(skip);
  const LimitQuery = paginateQuery.limit(limit);

  let fields  = '-__v';
  if(query.fields){
    fields =( query.fields as string).split(',').join(' ');
  }
  const FieldsQuery = await LimitQuery.select(fields);
  
  return FieldsQuery;
  */
  const StudentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('academicDepartment academicFaculty admissionSemester'),
    query,
  )
    .search(searchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await StudentQuery.queryModel;
  const meta = await StudentQuery.countTotal();
  return { result, meta };
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id }); // use findOne method
  // const result = await Student.aggregate([{ $match: { id: id } }]); // use aggregate method
  const result = await Student.findById(id); // use aggregate method
  return result;
};

const updateStudentInDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...restStudentData } = payload;
  const modifiedStudent: Record<string, unknown> = { ...restStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudent[`name.${key}`] = value;
    }
  }
  //guardian
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudent[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudent[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findByIdAndUpdate(id, modifiedStudent, {
    new: true,
  });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  const isUserExists = await Student.findById(id);
  if (!isUserExists) {
    throw new AppError(404, 'Student not found');
  }
  try {
    session.startTransaction();

    const studentDeleted = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!studentDeleted) {
      throw new AppError(400, 'Failed to delete user');
    }
    const userId = studentDeleted.user;
    const userDeleted = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!userDeleted) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return studentDeleted;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, error.message);
  }
};

export const studentService = {
  gerAllStudentFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  updateStudentInDb,
};
