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
