import { FreteRapidoService } from './frete-rapido.service';
import {
  mockErrorPattern400,
  mockErrorPattern500,
  mockFreteRapidoQuoteSimulateInput,
  mockFreteRapidoQuoteSimulateOutput,
} from '@test/mock';

jest.mock('@common/request-factory', () => ({
  ...jest.requireActual('@common/request-factory'),
  RequestFactoryService: jest.fn(
    () =>
      new (class MockRequestFactoryService {
        async post() {
          return Promise.resolve({});
        }
      })(),
  ),
}));

describe('FreteRapidoService', () => {
  let service: FreteRapidoService;

  beforeEach(() => {
    service = new FreteRapidoService();
  });

  it('status 200 - should call quoteSimulate - return success', async () => {
    jest
      .spyOn(service._requestFactory, 'post')
      .mockResolvedValue(mockFreteRapidoQuoteSimulateOutput);

    const result = await service.quoteSimulate({
      ...mockFreteRapidoQuoteSimulateInput,
    });

    expect(service._requestFactory.post).toHaveBeenCalledTimes(1);
    expect(result.dispatchers).toBeDefined();

    Object.keys(mockFreteRapidoQuoteSimulateOutput.dispatchers[0]).forEach(
      (key) => {
        expect(result.dispatchers[0]).toHaveProperty(key);
        expect(typeof result.dispatchers[0][key]).toBe(
          typeof mockFreteRapidoQuoteSimulateOutput.dispatchers[0][key],
        );
      },
    );

    Object.keys(
      mockFreteRapidoQuoteSimulateOutput.dispatchers[0].offers[0],
    ).forEach((key) => {
      expect(result.dispatchers[0].offers[0]).toHaveProperty(key);
      expect(typeof result.dispatchers[0].offers[0][key]).toBe(
        typeof mockFreteRapidoQuoteSimulateOutput.dispatchers[0].offers[0][key],
      );
    });
  });

  it('error status 400 - should call quoteSimulate - return badRequest', async () => {
    jest
      .spyOn(service._requestFactory, 'post')
      .mockRejectedValue(mockErrorPattern400);

    await service
      .quoteSimulate({
        ...mockFreteRapidoQuoteSimulateInput,
      })
      .catch((actualError) => {
        Object.keys(mockErrorPattern400).forEach((key) => {
          expect(actualError).toHaveProperty(key);
          expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
        });
      })
      .then((result) => expect(result).toBe(undefined));
  });

  it('error status 500 - should call quoteSimulate - return internalServerError', async () => {
    jest
      .spyOn(service._requestFactory, 'post')
      .mockRejectedValue(mockErrorPattern500);

    await service
      .quoteSimulate({
        ...mockFreteRapidoQuoteSimulateInput,
      })
      .catch((actualError) => {
        Object.keys(mockErrorPattern500).forEach((key) => {
          expect(actualError).toHaveProperty(key);
          expect(typeof actualError[key]).toBe(typeof mockErrorPattern500[key]);
        });
      })
      .then((result) => expect(result).toBe(undefined));
  });
});
