import { Request, Response } from 'express';

import { AuthenticatedUser } from '../types/user.type';
import reviewModelInstance from '../models/review.model';

class ReviewController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const review = await reviewModelInstance.register(req.body);
      res.status(201).json(review);
    }
    catch (error) {
      res.status(500).json({ error: `Error to register review: ${error}` });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const review_id = req.params.review_id;
      const user_id = (req.user as AuthenticatedUser).id;
      const review = await reviewModelInstance.update(review_id, user_id, req.body);
      if (!review) {
        res.status(404).json({ error: 'Review not found' });
      } else {
        res.status(202).json(review);
      }
    } catch (error) {
      res.status(500).json({ error: `Error to update review: ${error}` });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const review_id = req.params.id;
      const user_id = (req.user as AuthenticatedUser).id;
      const deletedReview = await reviewModelInstance.delete(review_id, user_id);
      if (!deletedReview) {
        res.status(404).json({ error: 'Review not found' });
      } else {
        res.status(202).json(deletedReview);
      }
    } catch (error) {
      res.status(500).json({ error: `Error to delete review: ${error}` });
    }
  }

  public async getByRecipientId(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await reviewModelInstance.getByRecipientId(req.params.recipient_id);
      if (!reviews) {
        res.status(404).json({ error: 'Reviews not found' });
      } else {
        res.status(200).json(reviews);
      }
    } catch (error) {
      res.status(500).json({ error: `Error to get reviews: ${error}` });
    }
  }

}


export default new ReviewController()