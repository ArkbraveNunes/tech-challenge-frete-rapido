import { faker } from '@faker-js/faker/locale/pt_BR';
import { ErrorPatternOutput } from '@common/error-pattern';
import { HttpStatusCode } from 'axios';

export const mockErrorPattern: ErrorPatternOutput = {
  statusCode: HttpStatusCode.ServiceUnavailable,
  message: faker.string.sample(),
  data: null,
};
