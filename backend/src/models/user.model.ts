import { Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IUser, UserSchema } from '../schemas/user.schema';

class UserModel {
  private model: Model<IUser>;

  public constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IUser>('User', UserSchema);
  }

  public async login(email: string, username: string): Promise<IUser | null> {
    try {
      let user = null;
      if (username) {
        user = await this.model.findOne({ username }).select('+password');
      } else if (email) {
        user = await this.model.findOne({ email }).select('+password');
      }
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async register(userData: IUser): Promise<IUser> {
    try {
      const newUser = new this.model(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, userData: IUser): Promise<IUser | null> {
    try {
      userData.updated_at = new Date();
      const updatedUser = await this.model.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<IUser | null> {
    try {
      const deletedUser = await this.model.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

}

export default new UserModel();