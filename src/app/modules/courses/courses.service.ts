/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse, TCourseFaculty } from './courses.interface';
import { Course, CourseFaculty } from './courses.model';
import AppError from '../../errors/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(['title', 'prefix', 'code'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.queryModel;
  return result;
};

const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCoursesIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...remainingCourseData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(400, 'Failed to update course');
    }
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletedPreReQuisite = preRequisiteCourse
        .filter((elm) => elm.course && elm.isDeleted)
        .map((elm) => elm.course);

      const deletedPreReQuisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreReQuisite } },
          },
        },
        {
          new: true,
          session,
        },
      );
      if (!deletedPreReQuisiteCourses) {
        throw new AppError(400, 'Failed to update course');
      }
      const newPrerequisites = preRequisiteCourse.filter(
        (elm) => elm.course && !elm.isDeleted,
      );
      const newPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPrerequisites } },
        },
        {
          new: true,
          session,
        },
      );
      if (!newPrerequisiteCourses) {
        throw new AppError(400, 'Failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    );
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const deleteCoursesFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const createCourseFacultyIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    { upsert: true, new: true },
  );
  return result;
};

const removeCourseFacultyFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  updateCoursesIntoDB,
  deleteCoursesFromDB,
  createCourseFacultyIntoDB,
  removeCourseFacultyFromDB,
};
