import { z } from 'zod';

import { ValidatorDataInput } from '@common/middlewares';
import { QuoteServiceOutputDto } from '@domain/service';
import { FRETE_RAPIDO_CATEGORY } from '@infra/adapter';

export const validateQuoteInput: ValidatorDataInput = {
  body: z.object({
    recipient: z
      .object({
        address: z
          .object({
            zipcode: z
              .number({
                coerce: true,
              })
              .min(1, 'zip code is required'),
          })
          .required(),
      })
      .required(),
    volumes: z
      .object({
        category: z.nativeEnum(FRETE_RAPIDO_CATEGORY),
        amount: z.number(),
        unitary_weight: z.number(),
        price: z.number(),
        sku: z.string(),
        height: z.number(),
        width: z.number(),
        length: z.number(),
      })
      .array(),
  }),
};

export type QuoteInputDto = {
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

export type QuoteOutputDto = QuoteServiceOutputDto;
