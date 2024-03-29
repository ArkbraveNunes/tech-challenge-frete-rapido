import { ICreateManyRepository } from '@common/interfaces';
import { SimulationEntity } from '@domain/entity';

export interface ISimulationContract
  extends ICreateManyRepository<SimulationEntity> {}
