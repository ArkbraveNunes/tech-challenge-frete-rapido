import {
  QuoteServiceInputDto,
  QuoteServiceOutputDto,
} from './quote.service.dto';
import { FreteRapidoAdapter } from '@infra/adapter';
import { SimulationEntity } from '@domain/entity';
import { ILogger, LoggerService } from '@common/logger';
import { ErrorPatternService, IErrorPattern } from '@common/error-pattern';
import { ISimulationContract } from '@domain/contract';
import { SimulationRepository } from '@infra/repository';

export class QuoteService {
  logger: ILogger;
  errorPattern: IErrorPattern;

  _freteRapidoAdapter: FreteRapidoAdapter;
  _simulationRepository: ISimulationContract;

  constructor() {
    this.errorPattern = new ErrorPatternService();
    this.logger = new LoggerService(QuoteService.name);

    this._freteRapidoAdapter = new FreteRapidoAdapter();
    this._simulationRepository = new SimulationRepository();
  }

  async exec({
    recipient: {
      address: { zipcode: zipCode },
    },
    volumes,
  }: QuoteServiceInputDto): Promise<QuoteServiceOutputDto> {
    try {
      const {
        dispatchers: [{ offers }],
      } = await this._freteRapidoAdapter.quoteSimulate({
        zipCode,
        volumes,
      });

      const simulations = offers.map((offer) =>
        SimulationEntity.create({
          name: offer.carrier.name,
          service: offer.service,
          deadline: offer.delivery_time.days,
          deliveryDate: offer.delivery_time.estimated_date,
          price: offer.final_price,
        }),
      );

      await this._simulationRepository.createMany(simulations);

      return { carrier: simulations };
    } catch (error: any) {
      this.logger.error({ error: error });

      throw error.statusCode
        ? this.errorPattern.customError(error)
        : this.errorPattern.internalServerError();
    }
  }
}
