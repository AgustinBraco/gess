import { Schema, Document } from 'mongoose';

interface IMessage {
  sender_id: string;
  text: string;
  readed: boolean;
  timestamp: Date;
}

export interface IParticipant {
  id: string;
  username: string;
  unreaded: boolean;
}

export interface IChat extends Document {
  participants: IParticipant[];
  messages: IMessage[];
}

export const ChatSchema = new Schema<IChat>({
  participants: [{
    id: { type: String, required: true },
    username: { type: String, required: true },
    unreaded: { type: Boolean, default: false }
  }],
  messages: [{
    sender_id: { type: String, required: true },
    text: { type: String, required: true },
    readed: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  }]
})