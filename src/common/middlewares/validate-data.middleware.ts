import { ErrorPatternService } from '@common/error-pattern';
import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodRecord, z } from 'zod';

export type ValidatorDataInput = {
  body?: z.ZodObject<any, any> | ZodRecord;
  query?: z.ZodObject<any, any> | ZodRecord;
};

export function ValidateData(validator: ValidatorDataInput) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validator.body) {
        validator.body.parse(req.body);
      }
      if (validator.query) {
        validator.query.parse(req.query);
      }
      next();
    } catch (err) {
      const errorPattern = new ErrorPatternService();

      if (!(err instanceof ZodError)) {
        const error = errorPattern.internalServerError();
        res.status(error.statusCode).json({ ...error });
      }

      const zodError = err as ZodError;

      const error = errorPattern.badRequest({
        statusCode: HttpStatusCode.BadRequest,
        message: zodError.errors.map(
          (issue: any) => `${issue.path.join('.')} is ${issue.message}`,
        ),
      });
      res.status(error.statusCode).json({ ...error });
    }
  };
}
