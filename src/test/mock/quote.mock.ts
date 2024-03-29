import { QuoteInputDto } from '@application/dto';
import { QuoteServiceInputDto, QuoteServiceOutputDto } from '@domain/service';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { FRETE_RAPIDO_CATEGORY } from '@infra/adapter';

export const mockQuoteControllerInput: QuoteInputDto = {
  recipient: {
    address: {
      zipcode: faker.location.zipCode(),
    },
  },
  volumes: [
    {
      category: FRETE_RAPIDO_CATEGORY.GIFTS,
      amount: faker.number.int(),
      unitary_weight: faker.number.int(),
      price: faker.number.int(),
      sku: faker.string.sample(),
      height: faker.number.float(),
      width: faker.number.float(),
      length: faker.number.float(),
    },
  ],
};

export const mockQuoteServiceInput: QuoteServiceInputDto =
  mockQuoteControllerInput;

export const mockQuoteServiceOutput: QuoteServiceOutputDto = {
  carrier: [
    {
      id: faker.database.mongodbObjectId(),
      name: faker.company.name(),
      service: faker.company.name(),
      deadline: faker.number.int(),
      deliveryDate: faker.date.future().toISOString(),
      price: faker.number.int(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};
