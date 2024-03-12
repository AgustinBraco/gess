import { Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IParticipant, IChat, ChatSchema } from '../schemas/chat.schema';

class ChatModel {
  private model: Model<IChat>;

  public constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IChat>('Chat', ChatSchema);
  }

  public async create(participants: IParticipant[]): Promise<IChat> {
    try {
      const newChat = new this.model({ participants, messages: [] });
      const savedChat = await newChat.save();
      return savedChat;
    } catch (error) {
      throw error;
    }
  }

  public async getByParticipantId(participant_id: string): Promise<IParticipant[] | null> {
    try {
      const chats = await this.model.find({ 'participants.id': participant_id }, 'participants');
      if (!chats) {
        return null;
      }
      let otherParticipant: IParticipant[] = [];
      chats.forEach(chat => {
        chat.participants.forEach(participant => {
          if (participant.id !== participant_id) {
            otherParticipant.push(participant);
          }
        })
      })
      return otherParticipant
    } catch (error) {
      throw error;
    }
  }

  public async getByTwoParticipants(participants: IParticipant[]): Promise<IChat | null> {
    try {
      const chat = await this.model.findOne({
        'participants.id': { $all: [participants[0].id, participants[1].id] }
      });
      if (!chat) {
        return null;
      }
      // cuando abro un chat, lo pongo como leido
      const index = chat.participants.findIndex(participant => participant.id === participants[0].id);
      chat.participants[index].unreaded = false;
      await chat.save();

      return chat;
    } catch (error) {
      throw error;
    }
  }

  public async addMessage(participant_id_1: string, participant_id_2: string, text: string): Promise<any | null> {
    try {
      await this.model.updateOne({
        'participants.id': { $all: [participant_id_1, participant_id_2] }
      }, {
        $push: {
          messages: {
            sender_id: participant_id_1,
            text,
          }
        }
      }
      );
      return null;
    } catch (error) {
      throw error;
    }
  }

}

export default new ChatModel()