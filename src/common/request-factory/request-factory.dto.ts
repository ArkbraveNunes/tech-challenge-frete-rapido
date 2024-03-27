import { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export type RequestFactoryRetriesHeader = {
  requestRetries: number;
};

export type RequestFactoryOptionsInput = CreateAxiosDefaults & {
  retries?: number;
};

export type RequestFactoryMethodInput = {
  url: string;
  data: Record<string, any>;
  headers?: Record<string, any>;
  customConfig?: AxiosRequestConfig;
};
