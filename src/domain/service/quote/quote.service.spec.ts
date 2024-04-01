import { QuoteService } from './quote.service';
import {
  mockErrorPattern400,
  mockErrorPattern500,
  mockFreteRapidoQuoteSimulateOutput,
  mockQuoteServiceInput,
} from '@test/mock';

jest.mock('@common/logger', () => ({
  ...jest.requireActual('@common/logger'),
  LoggerService: jest.fn(
    () =>
      new (class MockRequestFactoryService {
        error() {}
      })(),
  ),
}));

jest.mock('@infra/adapter', () => ({
  ...jest.requireActual('@infra/adapter'),
  FreteRapidoAdapter: jest.fn(
    () =>
      new (class MockRequestFactoryService {
        async quoteSimulate() {
          return Promise.resolve({});
        }
      })(),
  ),
}));

jest.mock('@infra/repository', () => ({
  ...jest.requireActual('@infra/repository'),
  SimulationRepository: jest.fn(
    () =>
      new (class MockRequestFactoryService {
        async createMany() {
          return Promise.resolve({});
        }
      })(),
  ),
}));

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    service = new QuoteService();
  });

  it('status 200 - should call exec - return success', async () => {
    jest
      .spyOn(service._freteRapidoAdapter, 'quoteSimulate')
      .mockResolvedValue(mockFreteRapidoQuoteSimulateOutput);
    jest
      .spyOn(service._simulationRepository, 'createMany')
      .mockResolvedValue(void 0);

    const result = await service.exec({
      ...mockQuoteServiceInput,
    });

    expect(service._freteRapidoAdapter.quoteSimulate).toHaveBeenCalledTimes(1);
    expect(service._freteRapidoAdapter.quoteSimulate).toHaveBeenCalledWith({
      zipCode: mockQuoteServiceInput.recipient.address.zipcode,
      volumes: mockQuoteServiceInput.volumes,
    });
    expect(service._simulationRepository.createMany).toHaveBeenCalledTimes(1);
    expect(result.carrier).toBeDefined();
    expect(result.carrier).toHaveLength(1);
  });

  it('error status 500 - should call exec - adapter error - return internalServerError', async () => {
    jest
      .spyOn(service._freteRapidoAdapter, 'quoteSimulate')
      .mockRejectedValue(mockErrorPattern500);

    jest.spyOn(service._simulationRepository, 'createMany');

    await service
      .exec({
        ...mockQuoteServiceInput,
      })
      .catch((actualError) => {
        Object.keys(mockErrorPattern500).forEach((key) => {
          expect(actualError).toHaveProperty(key);
          expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
        });
      })
      .then((result) => expect(result).toBe(undefined));
  });

  it('error status 500 - should call exec - database error - return internalServerError', async () => {
    jest
      .spyOn(service._freteRapidoAdapter, 'quoteSimulate')
      .mockResolvedValue(mockFreteRapidoQuoteSimulateOutput);
    jest
      .spyOn(service._simulationRepository, 'createMany')
      .mockRejectedValue(mockErrorPattern500);

    await service
      .exec({
        ...mockQuoteServiceInput,
      })
      .catch((actualError) => {
        Object.keys(mockErrorPattern500).forEach((key) => {
          expect(actualError).toHaveProperty(key);
          expect(typeof actualError[key]).toBe(typeof mockErrorPattern400[key]);
        });
      })
      .then((result) => expect(result).toBe(undefined));
  });
});
