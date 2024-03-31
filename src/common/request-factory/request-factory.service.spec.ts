import { HttpStatusCode } from 'axios';
import { RequestFactoryService } from './request-factory.service';
import { mockErrorPattern500, mockErrorPattern400 } from '@test/mock';
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
    jest.spyOn(service._httpService, 'get').mockResolvedValue({});

    await service.get({
      url: '',
    });

    expect(service._httpService.get).toHaveBeenCalledTimes(1);
  });

  it('should call post', async () => {
    jest.spyOn(service._httpService, 'post').mockResolvedValue({});

    await service.post({
      url: '',
      data: {},
    });

    expect(service._httpService.post).toHaveBeenCalledTimes(1);
  });

  it('should call put', async () => {
    jest.spyOn(service._httpService, 'put').mockResolvedValue({});

    await service.put({
      url: '',
      data: {},
    });

    expect(service._httpService.put).toHaveBeenCalledTimes(1);
  });

  it('should call patch', async () => {
    jest.spyOn(service._httpService, 'patch').mockResolvedValue({});

    await service.patch({
      url: '',
      data: {},
    });

    expect(service._httpService.patch).toHaveBeenCalledTimes(1);
  });

  it('should call delete', async () => {
    jest.spyOn(service._httpService, 'delete').mockResolvedValue({});

    await service.delete({
      url: '',
    });

    expect(service._httpService.delete).toHaveBeenCalledTimes(1);
  });

  it('should call errorHandlerInterceptor - return FAILED_DEPENDENCY', async () => {
    try {
      service.errorHandlerInterceptor({
        response: { status: HttpStatusCode.ServiceUnavailable },
      } as any);
    } catch (actualError) {
      Object.keys(mockErrorPattern500).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern500[key]);
      });
    }
  });

  it('should call errorHandlerInterceptor - return BAD_REQUEST', async () => {
    try {
      service.errorHandlerInterceptor({
        response: { status: HttpStatusCode.BadRequest },
        data: {},
      } as any);
    } catch (actualError) {
      Object.keys(mockErrorPattern400).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
      });
    }
  });

  it('should call errorHandlerInterceptor - return REQUEST_TIMEOUT', async () => {
    try {
      service.errorHandlerInterceptor({
        code: 'ECONNABORTED',
      } as any);
    } catch (actualError) {
      Object.keys(mockErrorPattern400).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
      });
    }
  });

  it('should call errorHandlerInterceptor - return INTERNAL_SERVER_ERROR (Unknown Error)', async () => {
    try {
      service.errorHandlerInterceptor({} as any);
    } catch (actualError) {
      Object.keys(mockErrorPattern500).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern500[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - return INTERNAL_SERVER_ERROR (Unknown Error)', async () => {
    try {
      await service.axiosRetryInterceptor({} as any);
    } catch (actualError) {
      Object.keys(mockErrorPattern500).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern500[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - get - return BAD_REQUEST', async () => {
    jest
      .spyOn(service._httpService, 'get')
      .mockImplementation(() =>
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.GET) as any),
      );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(HTTP_METHODS.GET, 1) as any,
      );
    } catch (actualError) {
      Object.keys(mockErrorPattern400).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - post - return BAD_REQUEST', async () => {
    jest
      .spyOn(service._httpService, 'post')
      .mockImplementation(() =>
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.POST) as any),
      );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(HTTP_METHODS.POST, 1) as any,
      );
    } catch (actualError) {
      Object.keys(mockErrorPattern400).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - put - return BAD_REQUEST', async () => {
    jest
      .spyOn(service._httpService, 'put')
      .mockImplementation(() =>
        service.axiosRetryInterceptor(mockAxiosError(HTTP_METHODS.PUT) as any),
      );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(HTTP_METHODS.PUT, 1) as any,
      );
    } catch (actualError) {
      Object.keys(mockErrorPattern400).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
      });
    }
  });

  it('should call axiosRetryInterceptor - patch - return BAD_REQUEST', async () => {
    jest
      .spyOn(service._httpService, 'patch')
      .mockImplementation(() =>
        service.axiosRetryInterceptor(
          mockAxiosError(HTTP_METHODS.PATCH) as any,
        ),
      );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(HTTP_METHODS.PATCH, 1) as any,
      );
    } catch (actualError) {
      Object.keys(mockErrorPattern400).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
      });
    }
  });
  it('should call axiosRetryInterceptor - delete - return BAD_REQUEST', async () => {
    jest
      .spyOn(service._httpService, 'delete')
      .mockImplementation(() =>
        service.axiosRetryInterceptor(
          mockAxiosError(HTTP_METHODS.DELETE) as any,
        ),
      );
    try {
      await service.axiosRetryInterceptor(
        mockAxiosError(HTTP_METHODS.DELETE, 1) as any,
      );
    } catch (actualError) {
      Object.keys(mockErrorPattern400).forEach((key) => {
        expect(actualError).toHaveProperty(key);
        expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
      });
    }
  });
});
