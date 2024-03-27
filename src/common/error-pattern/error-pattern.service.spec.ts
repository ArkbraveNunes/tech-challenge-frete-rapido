import { HttpStatusCode } from 'axios';
import { ErrorPatternService } from './error-pattern.service';
import { mockErrorPattern } from '@test/mock';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('ErrorPatternService', () => {
  let service: ErrorPatternService;

  beforeEach(() => {
    service = new ErrorPatternService();
  });

  it('should call badRequest - return badRequest error', async () => {
    const error = service.badRequest({
      statusCode: HttpStatusCode.RequestTimeout,
      message: faker.string.sample(),
      data: null,
    });

    Object.keys(mockErrorPattern).forEach((key) => {
      expect(error).toHaveProperty(key);
      expect(typeof error[key]).toBe(typeof mockErrorPattern[key]);
    });
  });

  it('should call internalServerError - return internalServerError error', async () => {
    const error = service.internalServerError({
      message: faker.string.sample(),
    });

    Object.keys(mockErrorPattern).forEach((key) => {
      expect(error).toHaveProperty(key);
      expect(typeof error[key]).toBe(typeof mockErrorPattern[key]);
    });
  });

  it('should call customError - return customError error', async () => {
    const error = service.customError({
      statusCode: HttpStatusCode.RequestTimeout,
      message: faker.string.sample(),
      data: null,
    });

    Object.keys(mockErrorPattern).forEach((key) => {
      expect(error).toHaveProperty(key);
      expect(typeof error[key]).toBe(typeof mockErrorPattern[key]);
    });
  });
});
