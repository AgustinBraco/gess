import { Request, Response } from 'express';

import { AuthenticatedUser } from '../types/user.type';
import userModelInstance from '../models/user.model';
import { validateAndHashPassword, checkPassword, createJWT, sendEmailToUser } from '../helpers/user.helper';

class UserController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      req.body.password = validateAndHashPassword(req.body.password);
      const user = await userModelInstance.register(req.body);
      user.password = '';
      const token = createJWT(user.id, user.role);
      await sendEmailToUser("Registro usuario Gestores", user.email, user.username, 'Gestores - Registro', 'Confirma tu email', token);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: `Error to register user: ${error}` });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await userModelInstance.login(req.body.email, req.body.username);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else if (!checkPassword(req.body.password, user.password)) {
        res.status(401).json({ error: 'Wrong password' });
      } else {
        const token = createJWT(user.id, user.role);
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
        req.body.password = validateAndHashPassword(req.body.password);
      }
      const updatedUser = await userModelInstance.update(id, req.body);
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
      const deletedUser = await userModelInstance.delete(req.params.id);
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