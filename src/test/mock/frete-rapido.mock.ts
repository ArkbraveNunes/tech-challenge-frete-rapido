import { faker } from '@faker-js/faker/locale/pt_BR';
import {
  FreteRapidoQuoteSimulateInput,
  FreteRapidoQuoteSimulateOutput,
  FRETE_RAPIDO_CATEGORY,
  FRETE_RAPIDO_SIMULATION_TYPE,
} from '@infra/adapter';

export const mockFreteRapidoQuoteSimulateInput: FreteRapidoQuoteSimulateInput =
  {
    zipCode: faker.location.zipCode(),
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

export const mockFreteRapidoQuoteSimulateOutput: FreteRapidoQuoteSimulateOutput =
  {
    dispatchers: [
      {
        id: faker.string.uuid(),
        request_id: faker.string.uuid(),
        registered_number_shipper: faker.number.int().toString(),
        registered_number_dispatcher: faker.number.int().toString(),
        zipcode_origin: faker.number.int(),
        offers: [
          {
            offer: faker.number.int(),
            table_reference: faker.string.uuid(),
            simulation_type: FRETE_RAPIDO_SIMULATION_TYPE.FRACTIONED,
            carrier: {
              name: faker.company.name(),
              registered_number: faker.number.int().toString(),
              state_inscription: faker.number.int().toString(),
              logo: faker.image.url(),
              reference: faker.number.int(),
              company_name: faker.company.name(),
            },
            service: faker.string.sample(),
            delivery_time: {
              days: faker.number.int(),
              estimated_date: faker.date.anytime().toISOString(),
            },
            expiration: faker.date.anytime().toDateString(),
            cost_price: faker.number.float(),
            final_price: faker.number.float(),
            weights: {
              real: faker.number.int(),
              used: faker.number.int(),
            },
            original_delivery_time: {
              days: faker.number.int(),
              estimated_date: faker.date.anytime().toDateString(),
            },
            home_delivery: true,
            carrier_original_delivery_time: {
              days: faker.number.int(),
              estimated_date: faker.date.anytime().toDateString(),
            },
          },
        ],
      },
    ],
  };
