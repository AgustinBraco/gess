import { Request, Response } from 'express';

import { AuthenticatedUser } from '../types/user.type';
import userDtoInstance from '../dtos/user.dto';
import userHelper from '../helpers/user.helper';

class UserController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      req.body.password = userHelper.validateAndHashPassword(req.body.password);
      await userDtoInstance.register(req.body);
      res.status(201).json({ msg: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: `Error to register user: ${error}` });
    }
  }

  public async activate(req: Request, res: Response): Promise<void> {
    try {
      const user = await userDtoInstance.activate(req.params.activation_token);
      if (!user) {
        res.status(404).json({ error: 'User not activated.' });
      } else {
        const token = userHelper.createJWT(user.id, user.role);
        res.status(202).json({ token, user: user });
      }
    } catch (error) {
      res.status(500).json({ error: `Error to activate user: ${error}` });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await userDtoInstance.login(req.body.email, req.body.username);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else if (!userHelper.checkPassword(req.body.password, user.password)) {
        res.status(401).json({ error: 'Wrong password' });
      } else {
        const token = userHelper.createJWT(user.id, user.role);
        user.password = '';
        res.status(202).json({ token, user: user });
      }
    } catch (error) {
      res.status(500).json({ error: `Error to login user: ${error}` });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = (req.user as AuthenticatedUser).id;
      if (req.body.password) {
        req.body.password = userHelper.validateAndHashPassword(req.body.password);
      }
      const updatedUser = await userDtoInstance.update(id, req.body);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(202).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: `Error to update user: ${error}` });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await userDtoInstance.delete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(202).json(deletedUser);
      }
    } catch (error) {
      res.status(500).json({ error: `Error to delete user: ${error}` });
    }
  }


}

export default new UserController();