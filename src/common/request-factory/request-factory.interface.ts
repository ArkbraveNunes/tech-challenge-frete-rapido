import { AxiosRequestConfig } from 'axios';

export type RequestFactoryMethodInput = {
  url: string;
  data: Record<string, any>;
  headers?: Record<string, any>;
  customConfig?: AxiosRequestConfig;
};

export interface RequestFactory {
  get(
    requestFactoryMethodInput: Omit<RequestFactoryMethodInput, 'data'>,
  ): Promise<Record<string, any>>;
  delete(
    requestFactoryMethodInput: Omit<RequestFactoryMethodInput, 'data'>,
  ): Promise<Record<string, any>>;
  post(
    requestFactoryMethodInput: RequestFactoryMethodInput,
  ): Promise<Record<string, any>>;
  put(
    requestFactoryMethodInput: RequestFactoryMethodInput,
  ): Promise<Record<string, any>>;
  patch(
    requestFactoryMethodInput: RequestFactoryMethodInput,
  ): Promise<Record<string, any>>;
}
