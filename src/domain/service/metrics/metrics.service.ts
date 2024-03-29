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

    return this._simulationRepository.getMetrics({
      ...getMetricsInput,
    });
  }
}
