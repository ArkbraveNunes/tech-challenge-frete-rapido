export type ErrorPatternInput = {
  statusCode: number;
  message: string;
  data: Record<string, any> | null;
};

export type ErrorPatternOutput = {
  statusCode: number;
  message: string;
  data: Record<string, any> | null;
};

export interface ErrorPattern {
  badRequest(errorPatternInput: Partial<ErrorPatternInput>): ErrorPatternOutput;
  internalServerError(
    errorPatternInput: Pick<ErrorPatternInput, 'message'>,
  ): ErrorPatternOutput;
  customError(errorPatternInput: ErrorPatternInput): ErrorPatternOutput;
}
