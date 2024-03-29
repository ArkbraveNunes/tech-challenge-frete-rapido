import { MetricsController } from './metrics.controller';
import {
  mockErrorPattern500,
  mockMetricsControllerInput,
  mockMetricsServiceOutput,
} from '@test/mock';

jest.mock('@domain/service', () => ({
  ...jest.requireActual('@domain/service'),
  MetricsService: jest.fn(
    () =>
      new (class MockService {
        async exec() {
          return Promise.resolve({});
        }
      })(),
  ),
}));

describe('MetricsController', () => {
  let controller: MetricsController;

  const reqMock: any = {
    query: mockMetricsControllerInput,
  };
  const resMock: any = {
    status: () => ({
      json: (payload) => payload,
    }),
  };

  beforeEach(() => {
    controller = new MetricsController();
  });

  it('status 200 - should call quoteService - return success', async () => {
    jest
      .spyOn(controller._service, 'exec')
      .mockResolvedValue(mockMetricsServiceOutput);

    const result = await controller.exec(reqMock, resMock);

    expect(controller._service.exec).toHaveBeenCalledTimes(1);
    expect(controller._service.exec).toHaveBeenCalledWith({
      lastQuotes: parseInt(reqMock.query.last_quotes),
    });
    expect(result).toEqual(mockMetricsServiceOutput);
  });

  it('error status 500 - should call quoteSimulate - return internalServerError', async () => {
    jest
      .spyOn(controller._service, 'exec')
      .mockRejectedValue(mockErrorPattern500);

    const actualError = await controller.exec(reqMock, resMock);

    Object.keys(mockErrorPattern500).forEach((key) => {
      expect(actualError).toHaveProperty(key);
      expect(typeof actualError[key]).toBe(typeof mockErrorPattern500[key]);
    });
  });
});
