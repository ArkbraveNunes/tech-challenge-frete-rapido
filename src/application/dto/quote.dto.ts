import { QuoteServiceOutputDto } from '@domain/service';

export type QuoteInputDto = {
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

export type QuoteOutputDto = QuoteServiceOutputDto;
