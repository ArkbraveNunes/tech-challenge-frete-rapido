import { ISimulation } from '@domain/entity';
import { Schema, model } from 'mongoose';

const simulationSchema = new Schema<ISimulation>(
  {
    name: { type: String, required: true },
    service: { type: String, required: true },
    deadline: { type: Number, required: true },
    deliveryDate: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { id: true, versionKey: false, timestamps: true },
);

export const simulationModel = model('simulation', simulationSchema);
