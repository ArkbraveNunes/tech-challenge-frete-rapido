import { SimulationEntity } from '@domain/entity';
import { FRETE_RAPIDO_CATEGORY } from '@infra/adapter';

export type QuoteServiceInputDto = {
  recipient: {
    address: {
      zipcode: string;
    };
  };
  volumes: {
    category: FRETE_RAPIDO_CATEGORY;
    amount: number;
    unitary_weight: number;
    price: number;
    sku: string;
    height: number;
    width: number;
    length: number;
  }[];
};

export type QuoteServiceOutputDto = {
  carrier: SimulationEntity[];
};
