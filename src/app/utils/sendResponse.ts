/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
type TRes = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
};
const sendResponse = (res: Response, data: TRes) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
