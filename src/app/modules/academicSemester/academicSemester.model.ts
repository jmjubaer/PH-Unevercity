import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonth } from './academicSemester.interface';
const monthSchema = new Schema<TMonth>({
  type: 'String',
  enum: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  required: true,
});
const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: ['Autumn', 'Summer', 'Fall'],
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: ['01', '02', '03'],
  },
  year: { type: Date, required: true },
  startMonth: monthSchema,
  endMonth: monthSchema,
});

export const AcademinSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
