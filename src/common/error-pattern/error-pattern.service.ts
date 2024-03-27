import { ERROR_STATUS_CODE } from './error-pattern.enum';
import {
  ErrorPattern,
  ErrorPatternInput,
  ErrorPatternOutput,
} from './error-pattern.interface';

export class ErrorPatternService implements ErrorPattern {
  customError(errorPatternInput: ErrorPatternInput): ErrorPatternOutput {
    return {
      statusCode: errorPatternInput.statusCode,
      data: errorPatternInput.data || null,
      message: errorPatternInput.message,
    };
  }
  badRequest(errorPatternInput: ErrorPatternInput): ErrorPatternOutput {
    return {
      statusCode: errorPatternInput.statusCode ?? ERROR_STATUS_CODE.BAD_REQUEST,
      data: errorPatternInput.data || null,
      message: errorPatternInput.message,
    };
  }
  internalServerError(
    errorPatternInput: Pick<ErrorPatternInput, 'message'>,
  ): ErrorPatternOutput {
    return {
      statusCode: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: null,
      message: errorPatternInput.message,
    };
  }
}
