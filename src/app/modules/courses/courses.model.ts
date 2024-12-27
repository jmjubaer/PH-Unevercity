import { model, Schema } from 'mongoose';
import { TCourse, TCourseFaculty } from './courses.interface';

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourse: [
    {
      course: { type: Schema.Types.ObjectId, ref: 'Course' },
      isDeleted: { type: Boolean, default: false },
    },
  ],
});

export const Course = model<TCourse>('Course', courseSchema);
const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: 'Course',unique: true },
  faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
});

export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);
