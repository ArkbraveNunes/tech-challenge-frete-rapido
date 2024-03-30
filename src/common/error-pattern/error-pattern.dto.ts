import { HttpStatusCode } from 'axios';

export type ErrorPatternInput = {
  statusCode: HttpStatusCode;
  message: string[];
  data: Record<string, any> | null;
};

export type ErrorPatternOutput = {
  statusCode: HttpStatusCode;
  message: string[];
  data: Record<string, any> | null;
};
