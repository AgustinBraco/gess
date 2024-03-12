import { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  sender_id: string;
  recipient_id: string;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}

export const ReviewSchema = new Schema<IReview>({
  sender_id: { type: String, required: true },
  recipient_id: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})