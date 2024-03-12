import { Request, Response } from "express";

import chatModelInstance from "../models/chat.model";

class ChatController {

  public async open(req: Request, res: Response): Promise<void> {
    try {
      // body { participants: [{id, username}, {id, username}] }
      const chat = await chatModelInstance.getByTwoParticipants(req.body.participants);
      if (!chat) {
        await chatModelInstance.create(req.body.participants);
      }
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ error: `Error to open chat: ${error}` });
    }
  }

  public async getByParticipantId(req: Request, res: Response): Promise<void> {
    try {
      const chats = await chatModelInstance.getByParticipantId(req.params.participant_id);
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ error: `Error to get chat: ${error}` });
    }
  }


}

export default new ChatController();