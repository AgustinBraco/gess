import { Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IReview, ReviewSchema } from '../schemas/review.schema';

class ReviewModel {
  private model: Model<IReview>;

  public constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IReview>('Review', ReviewSchema);
  }

  public async register(reviewData: IReview): Promise<IReview> {
    try {
      const newReview = new this.model(reviewData);
      const savedReview = await newReview.save();
      return savedReview;
    } catch (error) {
      throw error;
    }
  }

  public async update(review_id: string, user_id: string, reviewData: IReview): Promise<IReview | null> {
    try {
      const updatedReview = await this.model.findByIdAndUpdate(
        { _id: review_id, sender_id: user_id },
        { ...reviewData, updated_at: new Date() },
        { new: true });
      return updatedReview;
    } catch (error) {
      throw error;
    }
  }

  public async delete(review_id: string, user_id: string): Promise<IReview | null> {
    try {
      const deletedReview = await this.model.findByIdAndDelete({ _id: review_id, sender_id: user_id });
      return deletedReview;
    } catch (error) {
      throw error;
    }
  }

  public async getByRecipientId(id: string): Promise<IReview[] | null> {
    try {
      const reviews = await this.model.find({ recipient_id: id });
      return reviews;
    } catch (error) {
      throw error;
    }
  }

}

export default new ReviewModel();