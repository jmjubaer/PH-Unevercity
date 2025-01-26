/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application, NextFunction, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/students/students.routes';
import { userRoutes } from './app/modules/users/users.routes';
import { globalErrorHandler } from './app/modules/middleware/globalErrorHandler';
import { notFound } from './app/modules/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
