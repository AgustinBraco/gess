import { IUser } from "../schemas/user.schema";
import userModelInstance from "../models/user.model";
import userHelper from "../helpers/user.helper";

class UserDto {

  public async register(userData: IUser): Promise<void> {
    try {
      userData.activation_token = userHelper.newActivationToken();
      const user = await userModelInstance.register(userData);
      await userHelper.sendActivateAccountEmail("Registro usuario Gess", user.email, user.username, 'Gess - Registro', 'Verifica tu cuenta en Gess', user.activation_token);
    } catch (error) {
      throw error;
    }
  }

  public async activate(activation_token: string): Promise<IUser | null> {
    try {
      const user = await userModelInstance.activate(activation_token);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async login(email: string, username: string): Promise<IUser | null> {
    try {
      const user = await userModelInstance.login(email, username);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, userData: IUser): Promise<IUser | null> {
    try {
      const updatedUser = await userModelInstance.update(id, userData);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<IUser | null> {
    try {
      const deletedUser = await userModelInstance.delete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

}

export default new UserDto()