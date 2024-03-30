import { GetMetricsOutput } from '@domain/contract';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const mockGetMetricsRepositoryOutput: GetMetricsOutput = [
  {
    name: faker.company.name(),
    maxPrice: parseFloat(faker.number.float().toFixed(2)),
    mediaPrice: parseFloat(faker.number.float().toFixed(2)),
    minPrice: parseFloat(faker.number.float().toFixed(2)),
    totalPrice: parseFloat(faker.number.float().toFixed(2)),
    totalSimulations: faker.number.int({ max: 10 }),
  },
];
