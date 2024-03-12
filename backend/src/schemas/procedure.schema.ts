import { Schema, Document } from 'mongoose';

interface IPayment {
  amount: number;
  comment: string;
  screenshot: string[];
  tiemstamp: Date;
}

export interface IProcedure extends Document {
  manager_id: string;
  client_id: string;
  service_id: string;
  location_id: string;
  description: string;
  total_amount: number;
  payments: IPayment[];
  status: string;
  created_at: Date;
  updated_at: Date;
  finished_at: Date;
}

export const ProcedureSchema = new Schema<IProcedure>({
  manager_id: { type: String, required: true },
  client_id: { type: String, required: true },
  service_id: { type: String },
  location_id: { type: String },
  description: { type: String, required: true },
  total_amount: { type: Number, required: true },
  payments: [{
    amount: { type: Number, required: true },
    comment: { type: String },
    screenshot: { type: [String] },
    tiemstamp: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'IN_PROGRESS', 'SENDED', 'FINISHED']
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})