import { faker } from '@faker-js/faker/locale/pt_BR';

import { SimulationEntity } from '@domain/entity';

describe('SimulationEntity', () => {
  it('should return a SimulationEntity instance with valid props on create()', () => {
    const simulation = SimulationEntity.create({
      name: faker.string.sample(),
      deadline: faker.number.int(),
      deliveryDate: faker.date.future().toISOString(),
      service: faker.string.sample(),
      price: faker.number.int(),
    });

    expect(simulation.id).toBeDefined();
    expect(simulation.name).toBeDefined();
    expect(simulation.service).toBeDefined();
    expect(simulation.deadline).toBeDefined();
    expect(simulation.price).toBeDefined();
    expect(simulation.createdAt).toBeDefined();
    expect(simulation.updatedAt).toBeDefined();
  });
});
