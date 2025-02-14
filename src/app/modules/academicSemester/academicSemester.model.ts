import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { Months } from './academicsemester.constant';
import AppError from '../../errors/AppError';
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

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new AppError(409,'Semester already exists');
  }
  next();
});
export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
