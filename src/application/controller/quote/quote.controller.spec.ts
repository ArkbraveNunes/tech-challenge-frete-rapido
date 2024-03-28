import { QuoteController } from './quote.controller';
import {
  mockErrorPattern500,
  mockQuoteControllerInput,
  mockQuoteServiceOutput,
} from '@test/mock';

jest.mock('@domain/service', () => ({
  ...jest.requireActual('@domain/service'),
  QuoteService: jest.fn(
    () =>
      new (class MockService {
        async exec() {
          return Promise.resolve({});
        }
      })(),
  ),
}));

describe('QuoteController', () => {
  let controller: QuoteController;

  const reqMock: any = {
    body: mockQuoteControllerInput,
  };
  const resMock: any = {
    status: () => ({
      json: (payload) => payload,
    }),
  };

  beforeEach(() => {
    controller = new QuoteController();
  });

  it('status 200 - should call quoteService - return success', async () => {
    jest
      .spyOn(controller._service, 'exec')
      .mockResolvedValue(mockQuoteServiceOutput);

    const result = await controller.exec(reqMock, resMock);

    expect(controller._service.exec).toHaveBeenCalledTimes(1);
    expect(controller._service.exec).toHaveBeenCalledWith(reqMock.body);
    expect(result).toEqual(mockQuoteServiceOutput);
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
