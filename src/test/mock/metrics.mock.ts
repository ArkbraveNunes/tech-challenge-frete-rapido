import { faker } from '@faker-js/faker/locale/pt_BR';

import {
  MetricsServiceInputDto,
  MetricsServiceOutputDto,
} from '@domain/service';
import { mockGetMetricsRepositoryOutput } from './repository.mock';
import { MetricsInputDto, MetricsOutputDto } from '@application/dto';

export const mockMetricsServiceInput: MetricsServiceInputDto = {
  lastQuotes: faker.number.int(),
};

export const mockMetricsServiceOutput: MetricsServiceOutputDto = {
  carriers: mockGetMetricsRepositoryOutput,
  maxPriceGeneral: faker.number.int({ max: 10 }),
  minPriceGeneral: faker.number.int({ max: 10 }),
};

export const mockMetricsControllerInput: MetricsInputDto = {
  last_quotes: faker.number.int().toString(),
};

export const mockMetricsControllerOutput: MetricsOutputDto = {
  ...mockMetricsServiceOutput,
};
