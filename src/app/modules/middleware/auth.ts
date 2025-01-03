/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUserRole } from '../users/users.interface';
const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorized !');
    }
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(401, 'You are not authorized');
        }
        const userRole = (decoded as JwtPayload)?.role;
        if (requiredRole && !requiredRole.includes(userRole)) {
          throw new AppError(401, 'You are not authorized');
        }
        req.user = decoded as JwtPayload;
      },
    );
    next();
  });
};
export default auth;
