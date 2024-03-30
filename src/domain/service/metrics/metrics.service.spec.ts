import { MetricsService } from './metrics.service';
import {
  mockErrorPattern400,
  mockErrorPattern500,
  mockMetricsServiceInput,
  mockGetMetricsRepositoryOutput,
  mockMetricsServiceOutput,
} from '@test/mock';

jest.mock('@infra/repository', () => ({
  ...jest.requireActual('@infra/repository'),
  SimulationRepository: jest.fn(
    () =>
      new (class MockRequestFactoryService {
        async getMetrics() {
          return Promise.resolve({});
        }
      })(),
  ),
}));

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(() => {
    service = new MetricsService();
  });

  it('status 200 - should call exec - return success', async () => {
    jest
      .spyOn(service._simulationRepository, 'getMetrics')
      .mockResolvedValue(mockGetMetricsRepositoryOutput);

    const result = await service.exec({
      ...mockMetricsServiceInput,
    });

    expect(service._simulationRepository.getMetrics).toHaveBeenCalledTimes(1);
    expect(service._simulationRepository.getMetrics).toHaveBeenCalledWith({
      limit: mockMetricsServiceInput.lastQuotes,
    });
    expect(Array.isArray(result.carriers)).toBe(true);
    expect(result.carriers).toHaveLength(1);

    result.carriers.forEach((item) => {
      Object.keys(mockGetMetricsRepositoryOutput[0]).forEach((key) => {
        expect(item).toHaveProperty(key);
        expect(typeof item[key]).toBe(
          typeof mockGetMetricsRepositoryOutput[0][key],
        );
      });
    });

    expect(typeof result.maxPriceGeneral).toBe(
      typeof mockMetricsServiceOutput.maxPriceGeneral,
    );
    expect(typeof result.minPriceGeneral).toBe(
      typeof mockMetricsServiceOutput.minPriceGeneral,
    );
  });

  it('error status 500 - should call exec - database error - return internalServerError', async () => {
    jest
      .spyOn(service._simulationRepository, 'getMetrics')
      .mockRejectedValue(mockErrorPattern500);

    await service
      .exec({
        ...mockMetricsServiceInput,
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
