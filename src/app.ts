import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/students/students.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students',studentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
export default app;
