import { MetricsServiceOutputDto } from '@domain/service';

export type MetricsInputDto = {
  last_quotes?: string;
};

export type MetricsOutputDto = MetricsServiceOutputDto;
