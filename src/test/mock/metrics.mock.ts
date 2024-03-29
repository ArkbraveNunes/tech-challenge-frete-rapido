import { faker } from '@faker-js/faker/locale/pt_BR';

import {
  MetricsServiceInputDto,
  MetricsServiceOutputDto,
} from '@domain/service';
import { mockGetMetricsRepositoryOutput } from './repository.mock';
import { MetricsInputDto } from '@application/dto';

export const mockMetricsControllerInput: MetricsInputDto = {
  last_quotes: faker.number.int().toString(),
};

export const mockMetricsServiceInput: MetricsServiceInputDto = {
  lastQuotes: faker.number.int(),
};

export const mockMetricsServiceOutput: MetricsServiceOutputDto =
  mockGetMetricsRepositoryOutput;
