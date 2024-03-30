import { HttpStatusCode } from 'axios';

import { ErrorPatternInput, ErrorPatternOutput } from './error-pattern.dto';
import { IErrorPattern } from './error-pattern.interface';

export class ErrorPatternService implements IErrorPattern {
  customError(errorPatternInput: ErrorPatternInput): ErrorPatternOutput {
    return {
      statusCode: errorPatternInput.statusCode,
      message: errorPatternInput.message,
      data: errorPatternInput.data || {},
    };
  }
  badRequest(
    errorPatternInput: Partial<ErrorPatternInput>,
  ): ErrorPatternOutput {
    return this.customError({
      statusCode: errorPatternInput.statusCode || HttpStatusCode.BadRequest,
      message: errorPatternInput.message || ['Bad Request'],
      data: errorPatternInput.data || {},
    });
  }
  internalServerError(
    errorPatternInput?: Partial<Pick<ErrorPatternInput, 'message'>>,
  ): ErrorPatternOutput {
    return this.customError({
      statusCode: HttpStatusCode.InternalServerError,
      message: errorPatternInput?.message || ['Internal Server Error'],
      data: {},
    });
  }
}
