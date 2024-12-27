import { Types } from 'mongoose';

export type TPrerequisiteCourse = {
  course: string;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourse: TPrerequisiteCourse[];
};
export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
