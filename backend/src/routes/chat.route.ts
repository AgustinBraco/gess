import express from 'express';
import chatController from '../controllers/chat.controller';
import passport from '../middlewares/auth.mid';

const chatRouter = express.Router();

chatRouter.post(
  '/open',
  passport.authenticate('userJWT', { session: false }),
  chatController.open
)

chatRouter.get(
  '/getByParticipantId/:participant_id',
  passport.authenticate('userJWT', { session: false }),
  chatController.getByParticipantId
)

export default chatRouter