import { faker } from '@faker-js/faker/locale/pt_BR';
import * as winston from 'winston';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerService('TestLogger');
  });

  it('should call info', async () => {
    jest.spyOn(winston, 'createLogger');

    service.info(faker.string.sample());

    expect(winston.createLogger).toHaveBeenCalledTimes(1);
  });

  it('should call debug', async () => {
    jest.spyOn(winston, 'createLogger');

    service.debug(faker.string.sample());

    expect(winston.createLogger).toHaveBeenCalledTimes(1);
  });

  it('should call warn', async () => {
    jest.spyOn(winston, 'createLogger');

    service.warn(faker.string.sample());

    expect(winston.createLogger).toHaveBeenCalledTimes(1);
  });

  it('should call error', async () => {
    jest.spyOn(winston, 'createLogger');

    service.error(faker.string.sample());

    expect(winston.createLogger).toHaveBeenCalledTimes(1);
  });
});
