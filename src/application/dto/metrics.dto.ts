import { z } from 'zod';

import { ValidatorDataInput } from '@common/middlewares';
import { MetricsServiceOutputDto } from '@domain/service';

export const validateMetricsInput: ValidatorDataInput = {
  query: z.object({
    last_quotes: z.coerce.number().optional(),
  }),
};

export type MetricsInputDto = {
  last_quotes?: string;
};

export type MetricsOutputDto = MetricsServiceOutputDto;
