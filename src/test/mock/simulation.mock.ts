import { faker } from '@faker-js/faker/locale/pt_BR';
import { SimulationEntity } from '@domain/entity';

export const mockedSimulationEntity = () =>
  SimulationEntity.create({
    name: faker.string.sample(),
    deadline: faker.number.int(),
    deliveryDate: faker.date.future().toISOString(),
    service: faker.string.sample(),
    price: faker.number.int(),
  });
