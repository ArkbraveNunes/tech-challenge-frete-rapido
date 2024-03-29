import { ICreateManyRepository } from '@common/interfaces';
import { SimulationEntity } from '@domain/entity';
import { GetMetricsInput, GetMetricsOutput } from './simulation.contract.dto';

export interface ISimulationContract
  extends ICreateManyRepository<SimulationEntity> {
  getMetrics(getMetricsInput?: GetMetricsInput): Promise<GetMetricsOutput>;
}
