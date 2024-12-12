import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { Months } from './academicSemester.constant';
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
    year: { type: String, required: true },
    startMonth: {
      type: 'String',
      enum: Months,
      required: true,
    },
    endMonth: {
      type: 'String',
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
