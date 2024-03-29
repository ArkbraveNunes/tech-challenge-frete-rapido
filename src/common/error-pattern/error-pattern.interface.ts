import { ErrorPatternInput, ErrorPatternOutput } from './error-pattern.dto';

export interface IErrorPattern {
  badRequest(errorPatternInput: Partial<ErrorPatternInput>): ErrorPatternOutput;
  internalServerError(
    errorPatternInput?: Partial<Pick<ErrorPatternInput, 'message'>>,
  ): ErrorPatternOutput;
  customError(errorPatternInput: ErrorPatternInput): ErrorPatternOutput;
}
