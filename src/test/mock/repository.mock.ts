import { GetMetricsOutput } from '@domain/contract';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const mockGetMetricsRepositoryOutput: GetMetricsOutput = [
  {
    name: faker.company.name(),
    maxPrice: faker.number.float(),
    mediaPrice: faker.number.float(),
    minPrice: faker.number.float(),
    totalPrice: faker.number.float(),
    totalSimulations: faker.number.int(),
  },
];
