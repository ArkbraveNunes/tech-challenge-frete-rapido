import axios, { AxiosInstance, HttpStatusCode, AxiosError } from 'axios';

import { IRequestFactory } from './request-factory.interface';
import { AXIOS_ERRORS, HTTP_METHODS } from './request-factory.enum';
import { ErrorPatternService } from '@common/error-pattern';
import {
  RequestFactoryMethodInput,
  RequestFactoryOptionsInput,
  RequestFactoryRetriesHeader,
} from './request-factory.dto';

export class RequestFactoryService implements IRequestFactory {
  _httpService: AxiosInstance;
  axiosRetriesHeader: RequestFactoryRetriesHeader;
  constructor(
    private readonly requestFactoryOptions: RequestFactoryOptionsInput,
  ) {
    const { retries, ...configOptions } = requestFactoryOptions;

    this._httpService = axios.create({
      ...configOptions,
    });

    this._httpService.interceptors.response.use(
      (response) => response.data,
      (error) => this.axiosRetryInterceptor(error),
    );

    this.axiosRetriesHeader = { requestRetries: retries || 3 };
  }

  async get(
    requestFactoryMethodInput: Omit<RequestFactoryMethodInput, 'data'>,
  ): Promise<Record<string, any>> {
    const [url, headers, customConfig] = [
      requestFactoryMethodInput.url,
      requestFactoryMethodInput.headers || {},
      requestFactoryMethodInput.customConfig || {},
    ];

    return this._httpService.get(url, {
      ...customConfig,
      headers: { ...this.axiosRetriesHeader, ...headers },
    });
  }

  async post(
    requestFactoryMethodInput: RequestFactoryMethodInput,
  ): Promise<Record<string, any>> {
    const [url, data, headers, customConfig] = [
      requestFactoryMethodInput.url,
      requestFactoryMethodInput.data,
      requestFactoryMethodInput.headers || {},
      requestFactoryMethodInput.customConfig || {},
    ];

    return this._httpService.post(url, data, {
      ...customConfig,
      headers: { ...this.axiosRetriesHeader, ...headers },
    });
  }

  async put(
    requestFactoryMethodInput: RequestFactoryMethodInput,
  ): Promise<Record<string, any>> {
    const [url, data, headers, customConfig] = [
      requestFactoryMethodInput.url,
      requestFactoryMethodInput.data,
      requestFactoryMethodInput.headers || {},
      requestFactoryMethodInput.customConfig || {},
    ];

    return this._httpService.put(url, data, {
      ...customConfig,
      headers: { ...this.axiosRetriesHeader, ...headers },
    });
  }

  async patch(
    requestFactoryMethodInput: RequestFactoryMethodInput,
  ): Promise<Record<string, any>> {
    const [url, data, headers, customConfig] = [
      requestFactoryMethodInput.url,
      requestFactoryMethodInput.data,
      requestFactoryMethodInput.headers || {},
      requestFactoryMethodInput.customConfig || {},
    ];

    return this._httpService.patch(url, data, {
      ...customConfig,
      headers: { ...this.axiosRetriesHeader, ...headers },
    });
  }

  async delete(
    requestFactoryMethodInput: Omit<RequestFactoryMethodInput, 'data'>,
  ): Promise<Record<string, any>> {
    const [url, headers, customConfig] = [
      requestFactoryMethodInput.url,
      requestFactoryMethodInput.headers || {},
      requestFactoryMethodInput.customConfig || {},
    ];

    return this._httpService.delete(url, {
      ...customConfig,
      headers: { ...this.axiosRetriesHeader, ...headers },
    });
  }

  errorHandlerInterceptor(error: AxiosError): void {
    const errorPattern = new ErrorPatternService();

    const httpAxiosErrors = {
      [AXIOS_ERRORS.ERR_BAD_OPTION_VALUE]: {
        status: HttpStatusCode.InternalServerError,
        message:
          'Axios Error: Invalid or unsupported value provided in axios configuration.',
      },
      [AXIOS_ERRORS.ERR_BAD_OPTION]: {
        status: HttpStatusCode.InternalServerError,
        message: 'Axios Error: Invalid option provided in axios configuration.',
      },
      [AXIOS_ERRORS.ECONNABORTED]: {
        status: HttpStatusCode.RequestTimeout,
        message: 'Axios Timeout Error: Custom Timeout exceeded.',
      },
      [AXIOS_ERRORS.ECONNREFUSED]: {
        status: HttpStatusCode.FailedDependency,
        message:
          'Axios Request Error: Internal error communicating with the external API',
      },
      [AXIOS_ERRORS.ETIMEDOUT]: {
        status: HttpStatusCode.RequestTimeout,
        message: 'Axios Timeout Error: Default Timeout exceeded.',
      },
      [AXIOS_ERRORS.ERR_NETWORK]: {
        status: HttpStatusCode.InternalServerError,
        message: 'Axios Request Error: Unknown Error',
      },
      [AXIOS_ERRORS.ERR_FR_TOO_MANY_REDIRECTS]: {
        status: HttpStatusCode.TooManyRequests,
        message:
          'Axios Request Error: Request is redirected too many times, exceeds max redirects.',
      },
      [AXIOS_ERRORS.ERR_DEPRECATED]: {
        status: HttpStatusCode.NotImplemented,
        message: 'Axios Error: Deprecated feature or method used in axios',
      },
      [AXIOS_ERRORS.ERR_BAD_RESPONSE]: {
        status: HttpStatusCode.UnsupportedMediaType,
        message:
          'Axios Request Error: Response cannot be parsed properly or is in an unexpected format.',
      },
      [AXIOS_ERRORS.ERR_BAD_REQUEST]: {
        status: HttpStatusCode.BadRequest,
        message:
          'Axios Request Error: Requested to external API has unexpected format or missing required parameters.',
      },
      [AXIOS_ERRORS.ERR_CANCELED]: {
        status: HttpStatusCode.MethodNotAllowed,
        message:
          'Axios Request Error: Feature or method is canceled explicitly by the user.',
      },
      [AXIOS_ERRORS.ERR_NOT_SUPPORT]: {
        status: HttpStatusCode.InternalServerError,
        message:
          'Axios Error: Feature or method not supported in the current axios environment.',
      },
      [AXIOS_ERRORS.ERR_INVALID_URL]: {
        status: HttpStatusCode.InternalServerError,
        message: 'Axios Error: Invalid URL provided for axios request.',
      },
    };

    let errorObject;

    switch (true) {
      case error.response && error.response.status >= 500:
        errorObject = errorPattern.internalServerError({
          message: [httpAxiosErrors.ECONNREFUSED.message],
        });
        break;
      case error.response && error.response.status >= 400:
        errorObject = errorPattern.badRequest({
          statusCode: httpAxiosErrors.ERR_BAD_REQUEST.status,
          message: [
            httpAxiosErrors[
              (error.code || AXIOS_ERRORS.ERR_BAD_REQUEST) as AXIOS_ERRORS
            ].message,
          ],
          data: error.response.data,
        });
        break;
      case error.code && Object.keys(AXIOS_ERRORS).includes(error.code):
        errorObject = errorPattern.badRequest({
          statusCode: httpAxiosErrors[error.code as AXIOS_ERRORS].status,
          message: [httpAxiosErrors[error.code as AXIOS_ERRORS].message],
          data: null,
        });
        break;
      default:
        errorObject = errorPattern.internalServerError({
          message: [httpAxiosErrors.ERR_NETWORK.message],
        });
        break;
    }

    throw errorObject;
  }

  async axiosRetryInterceptor(
    error: AxiosError,
  ): Promise<Record<string, any> | void> {
    const requestRetries = error.config?.headers?.requestRetries || 0;
    const axiosRetriesStatus = [HttpStatusCode.RequestTimeout];

    if (requestRetries === 0) {
      this.errorHandlerInterceptor(error);
    } else if (
      error.response.status &&
      (axiosRetriesStatus.includes(error.response.status) ||
        error.response.status >= 500)
    ) {
      const headers = {
        ...error.config.headers,
        requestRetries: requestRetries - 1,
      };
      switch (error.config.method) {
        case HTTP_METHODS.GET:
          return this.get({ url: error.config.url, headers });
        case HTTP_METHODS.POST:
          return this.post({
            url: error.config.url,
            data: error.config.data,
            headers,
          });
        case HTTP_METHODS.PUT:
          return this.put({
            url: error.config.url,
            data: error.config.data,
            headers,
          });
        case HTTP_METHODS.PATCH:
          return this.patch({
            url: error.config.url,
            data: error.config.data,
            headers,
          });
        case HTTP_METHODS.DELETE:
          return this.delete({ url: error.config.url, headers });
        default:
          this.errorHandlerInterceptor(error);
      }
    } else {
      this.errorHandlerInterceptor(error);
    }
  }
}
