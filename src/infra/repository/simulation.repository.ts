import { PipelineStage } from 'mongoose';

import { ILogger, LoggerService } from '@common/logger';
import {
  GetMetricsInput,
  GetMetricsOutput,
  ISimulationContract,
} from '@domain/contract';
import { SimulationEntity } from '@domain/entity';
import { simulationModel } from '@infra/schema';

export class SimulationRepository implements ISimulationContract {
  logger: ILogger;
  private _model: typeof simulationModel;

  constructor() {
    this.logger = new LoggerService(SimulationRepository.name);
    this._model = simulationModel;
  }

  async getMetrics(
    getMetricsInput?: GetMetricsInput,
  ): Promise<GetMetricsOutput> {
    try {
      const baseQuery: PipelineStage[] = [
        {
          $sort: {
            _id: -1,
          },
        },
      ];

      if (getMetricsInput?.skip) {
        baseQuery.push({
          $skip: getMetricsInput.skip,
        });
      }
      if (getMetricsInput?.limit) {
        baseQuery.push({
          $limit: getMetricsInput.limit,
        });
      }

      return await this._model.aggregate([
        ...baseQuery,
        {
          $group: {
            _id: '$name',
            totalSimulations: {
              $sum: 1,
            },
            totalPrice: {
              $sum: '$price',
            },
            mediaPrice: {
              $avg: '$price',
            },
            minPrice: {
              $min: '$price',
            },
            maxPrice: {
              $max: '$price',
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            totalSimulations: 1,
            totalPrice: { $trunc: ['$totalPrice', 1] },
            mediaPrice: { $trunc: ['$mediaPrice', 1] },
            minPrice: 1,
            maxPrice: 1,
          },
        },
      ]);
    } catch (error: any) {
      this.logger.error({
        msg: `Error in method ${this.getMetrics.name}`,
        error,
      });
    }
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
      this.logger.error({
        msg: `Error in method ${this.createMany.name}`,
        error,
      });
    }
  }
}
