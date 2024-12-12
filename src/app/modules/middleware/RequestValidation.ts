import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const requestValidation = (validationSchema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await validationSchema.parseAsync({
          body: req.body,
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  export default requestValidation;