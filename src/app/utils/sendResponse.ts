/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}
type TRes = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: any;
};
const sendResponse = (res: Response, data: TRes) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
