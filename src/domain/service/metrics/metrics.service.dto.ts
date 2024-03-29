import { GetMetricsOutput } from '@domain/contract';

export type MetricsServiceInputDto = {
  lastQuotes: number;
};

export type MetricsServiceOutputDto = GetMetricsOutput;
