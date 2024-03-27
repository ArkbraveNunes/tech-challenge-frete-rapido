import { HttpStatusCode } from 'axios';
import { RequestFactoryService } from './request-factory.service';
import { mockErrorPattern } from '@test/mock';
import { HTTP_METHODS, AXIOS_ERRORS } from './request-factory.enum';

describe('RequestFactoryService', () => {
  let service: RequestFactoryService;
  const mockAxiosError = (method: HTTP_METHODS, retries = 0) => ({
    config: {
      url: 'http://example.com',
      headers: {
        axiosRetries: retries,
      },
      method: method,
    },
    response: {
      status: HttpStatusCode.RequestTimeout,
      data: {
        error: 'Timeout Exception',
      },
    },
    code: AXIOS_ERRORS.ETIMEDOUT,
  });

  beforeEach(() => {
    service = new RequestFactoryService({});
  });

  it('should call get', async () => {
    jest.spyOn(service.httpService, 'get').mockResolvedValue({});

    await service.get({
      url: '',
    });

    expect(service.httpService.get).toHaveBeenCalledTimes(1);
  });

  it('should call post', async () => {
    jest.spyOn(service.httpService, 'post').mockResolvedValue({});

    await service.post({
      url: '',
      data: {},
    });

    expect(service.httpService.post).toHaveBeenCalledTimes(1);
  });

  it('should call put', async () => {
    jest.spyOn(service.httpService, 'put').mockResolvedValue({});

    await service.put({
      url: '',
      data: {},
    });

    expect(service.httpService.put).toHaveBeenCalledTimes(1);
  });

  it('should call patch', async () => {
    jest.spyOn(service.httpService, 'patch').mockResolvedValue({});

    await service.patch({
      url: '',
      data: {},
    });

    expect(service.httpService.patch).toHaveBeenCalledTimes(1);
  });

  it('should call delete', async () => {
    jest.spyOn(service.httpService, 'delete').mockResolvedValue({});

    await service.delete({
      url: '',
    });

    expect(service.httpService.delete).toHaveBeenCalledTimes(1);
  });

  it('should call errorHandlerInterceptor - return FAILED_DEPENDENCY', async () => {
    try {
      service.errorHandlerInterceptor({
        response: { status: HttpStatusCode.ServiceUnavailable },
      });
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call errorHandlerInterceptor - return BAD_REQUEST', async () => {
    try {
      service.errorHandlerInterceptor({
        response: { status: HttpStatusCode.BadRequest },
        data: {},
      });
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call errorHandlerInterceptor - return REQUEST_TIMEOUT', async () => {
    try {
      service.errorHandlerInterceptor({
        code: 'ECONNABORTED',
      });
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call errorHandlerInterceptor - return INTERNAL_SERVER_ERROR (Unknown Error)', async () => {
    try {
      service.errorHandlerInterceptor({});
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - return INTERNAL_SERVER_ERROR (Unknown Error)', async () => {
    try {
      await service.axiosRetryInterceptor({});
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - get - return BAD_REQUEST', async () => {
    jest
      .spyOn(service.httpService, 'get')
      .mockReturnValue(
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.GET)),
      );
    try {
      await service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.GET, 1));
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - post - return BAD_REQUEST', async () => {
    jest
      .spyOn(service.httpService, 'post')
      .mockReturnValue(
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.POST)),
      );
    try {
      await service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.POST, 1));
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - put - return BAD_REQUEST', async () => {
    jest
      .spyOn(service.httpService, 'put')
      .mockReturnValue(
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.PUT)),
      );
    try {
      await service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.PUT, 1));
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - patch - return BAD_REQUEST', async () => {
    jest
      .spyOn(service.httpService, 'patch')
      .mockReturnValue(
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.PATCH)),
      );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(HTTP_METHODS.PATCH, 1),
      );
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });
  it('should call axiosRetryInterceptor - delete - return BAD_REQUEST', async () => {
    jest
      .spyOn(service.httpService, 'delete')
      .mockReturnValue(
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.DELETE)),
      );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(HTTP_METHODS.DELETE, 1),
      );
    } catch (actualError: any) {
      Object.keys(mockErrorPattern).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern[key]);
      });
    }
  });
});
