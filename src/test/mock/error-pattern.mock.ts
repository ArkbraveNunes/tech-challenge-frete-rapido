import { ErrorPatternOutput } from '@common/error-pattern';
import { HttpStatusCode } from 'axios';

export const mockErrorPattern500: ErrorPatternOutput = {
  statusCode: HttpStatusCode.InternalServerError,
  message: [HttpStatusCode[HttpStatusCode.InternalServerError]],
  data: {},
};

export const mockErrorPattern400: ErrorPatternOutput = {
  statusCode: HttpStatusCode.BadRequest,
  message: [HttpStatusCode[HttpStatusCode.BadRequest]],
  data: {},
};
