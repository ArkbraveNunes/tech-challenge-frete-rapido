import { QuoteInputDto, QuoteOutputDto } from '@application/dto';
import { QuoteServiceInputDto, QuoteServiceOutputDto } from '@domain/service';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { FRETE_RAPIDO_CATEGORY } from '@infra/adapter';

export const mockQuoteControllerInput: QuoteInputDto = {
  recipient: {
    address: {
      zipcode: faker.location.zipCode().replace('-', ''),
    },
  },
  volumes: [
    {
      category: FRETE_RAPIDO_CATEGORY.GIFTS,
      amount: faker.number.int({ max: 10 }),
      unitary_weight: parseFloat(faker.number.float().toFixed(2)),
      price: parseFloat(faker.number.float().toFixed(2)),
      sku: faker.string.sample(),
      height: parseFloat(faker.number.float().toFixed(2)),
      width: parseFloat(faker.number.float().toFixed(2)),
      length: parseFloat(faker.number.float().toFixed(2)),
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
      deadline: faker.number.int({ max: 10 }),
      deliveryDate: faker.date.future().toISOString(),
      price: parseFloat(faker.number.float().toFixed(2)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export const mockQuoteControllerOutput: QuoteOutputDto = {
  ...mockQuoteServiceOutput,
};
