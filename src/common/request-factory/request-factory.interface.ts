import { RequestFactoryMethodInput } from './request-factory.dto';

export interface IRequestFactory {
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
