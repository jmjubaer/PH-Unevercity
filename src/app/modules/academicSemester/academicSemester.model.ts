import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';
const monthsSchema = new Schema<TMonths>({
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
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
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
    startMonth: monthsSchema,
    endMonth: monthsSchema,
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
