import { SimulationEntity } from '@domain/entity';

export type QuoteServiceInputDto = {
  recipient: {
    address: {
      zipcode: string;
    };
  };
  volumes: {
    category: number;
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
