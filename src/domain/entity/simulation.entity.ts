import { Types } from 'mongoose';

import { ISimulation } from '@domain/entity';

export type CreateSimulationProps = Pick<
  ISimulation,
  'name' | 'service' | 'deadline' | 'price'
>;

export type DbSimulationProps = Omit<ISimulation, 'id'> & {
  _id: Types.ObjectId;
};

export class SimulationEntity {
  id: string;
  name: string;
  service: string;
  deadline: string;
  price: number;
  createdAt: string;
  updatedAt: string;

  constructor(simulation: ISimulation) {
    Object.assign(this, simulation);
  }

  static create(createSimulationProps: CreateSimulationProps) {
    const id = new Types.ObjectId().toString();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    return new SimulationEntity({
      ...createSimulationProps,
      id,
      createdAt,
      updatedAt,
    });
  }

  static fromDbToEntity(
    dbSimulationProps: DbSimulationProps,
  ): SimulationEntity {
    return new SimulationEntity({
      id: dbSimulationProps._id.toString(),
      name: dbSimulationProps.name,
      service: dbSimulationProps.service,
      deadline: dbSimulationProps.deadline,
      price: dbSimulationProps.price,
      createdAt: new Date(dbSimulationProps.createdAt).toISOString(),
      updatedAt: new Date(dbSimulationProps.updatedAt).toISOString(),
    });
  }
}
