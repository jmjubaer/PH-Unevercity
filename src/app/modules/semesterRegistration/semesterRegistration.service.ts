import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { status } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester;

  const ifHasUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [{ status: status.UPCOMING }, { status: status.ONGOING }],
  });
  if (ifHasUpcomingOrOngoingSemester) {
    throw new AppError(
      400,
      `There is already an ${ifHasUpcomingOrOngoingSemester?.status} Semester`,
    );
  }
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(400, 'The Academic Semester is not available');
  }

  const isSemesterAlreadyRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterAlreadyRegistered) {
    throw new AppError(400, 'The Semester is already registered');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const semesterQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterQuery.queryModel;
  const meta = await semesterQuery.countTotal()
  return {result, meta};
};
const getSingleSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new AppError(400, 'Register Semester is not Found');
  }
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestedStatus = payload?.status;
  if (currentSemesterStatus === status.ENDED) {
    throw new AppError(400, 'This semester is already Ended');
  }
  if (
    currentSemesterStatus === status.UPCOMING &&
    requestedStatus === status.ENDED
  ) {
    throw new AppError(
      400,
      `You can not change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterStatus === status.ONGOING &&
    requestedStatus === status.UPCOMING
  ) {
    throw new AppError(
      400,
      `You can not change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteSemesterRegistration = async (id: string) => {
  const result = await SemesterRegistration.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
