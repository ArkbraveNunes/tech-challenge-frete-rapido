import { ILogger, LoggerService } from '@common/logger';
import { ISimulationContract } from '@domain/contract';
import { SimulationEntity } from '@domain/entity';
import { simulationModel } from '@infra/schema';

export class SimulationRepository implements ISimulationContract {
  logger: ILogger;
  private _model: typeof simulationModel;

  constructor() {
    this.logger = new LoggerService(SimulationRepository.name);
    this._model = simulationModel;
  }
  async createMany(simulationList: SimulationEntity[]): Promise<void> {
    try {
      await this._model.insertMany(
        simulationList.map(({ id, ...simulation }) => ({
          _id: id,
          ...simulation,
        })),
      );
    } catch (error: any) {
      this.logger.error({ msg: 'Error in createMany simulations', error });
    }
  }
}
