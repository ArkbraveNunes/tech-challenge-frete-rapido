import { IService } from '@common/interfaces';
import {
  MetricsServiceInputDto,
  MetricsServiceOutputDto,
} from './metrics.service.dto';
import { ILogger, LoggerService } from '@common/logger';
import { ErrorPatternService, IErrorPattern } from '@common/error-pattern';
import { GetMetricsInput, ISimulationContract } from '@domain/contract';
import { SimulationRepository } from '@infra/repository';

export class MetricsService
  implements IService<MetricsServiceInputDto, MetricsServiceOutputDto>
{
  logger: ILogger;
  errorPattern: IErrorPattern;

  _simulationRepository: ISimulationContract;

  constructor() {
    this.errorPattern = new ErrorPatternService();
    this.logger = new LoggerService(MetricsService.name);

    this._simulationRepository = new SimulationRepository();
  }
  async exec({
    lastQuotes,
  }: MetricsServiceInputDto): Promise<MetricsServiceOutputDto> {
    const getMetricsInput: GetMetricsInput = {};

    if (lastQuotes) {
      getMetricsInput.limit = lastQuotes;
    }

    const metrics = await this._simulationRepository.getMetrics({
      ...getMetricsInput,
    });

    let [maxPriceGeneral, minPriceGeneral] = [0, 0];

    metrics.forEach(({ maxPrice, minPrice }, index) => {
      if (index === 0) {
        maxPriceGeneral = maxPrice;
        minPriceGeneral = minPrice;
      } else {
        maxPriceGeneral =
          maxPriceGeneral < maxPrice ? maxPrice : maxPriceGeneral;
        minPriceGeneral =
          minPriceGeneral > minPrice ? minPrice : minPriceGeneral;
      }
    });

    return { carriers: metrics, maxPriceGeneral, minPriceGeneral };
  }
}
