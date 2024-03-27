import { faker } from '@faker-js/faker/locale/pt_BR';
import { ErrorPatternOutput } from '@common/error-pattern';
import { HttpStatusCode } from 'axios';

export const mockErrorPattern500: ErrorPatternOutput = {
  statusCode: HttpStatusCode.ServiceUnavailable,
  message: faker.string.sample(),
  data: null,
};

export const mockErrorPattern400: ErrorPatternOutput = {
  statusCode: HttpStatusCode.BadRequest,
  message: faker.string.sample(),
  data: null,
};
