import express from 'express';
import reviewController from '../controllers/review.controller';
import passport from '../middlewares/auth.mid';

const reviewRouter = express.Router();

reviewRouter.post(
  '/register',
  passport.authenticate('userJWT', { session: false }),
  reviewController.register
)

reviewRouter.put(
  '/update/:review_id',
  passport.authenticate('userJWT', { session: false }),
  reviewController.update
)

reviewRouter.delete(
  '/delete/:review_id',
  passport.authenticate('userJWT', { session: false }),
  reviewController.delete
)

reviewRouter.get(
  '/getByRecipientId/:recipient_id',
  passport.authenticate('userJWT', { session: false }),
  reviewController.getByRecipientId
)


export default reviewRouter