import express from 'express';
import userController from '../controllers/user.controller';
import passport from '../middlewares/auth.mid';

const userRouter = express.Router();

userRouter.post(
  '/register',
  userController.register
)

userRouter.get(
  '/activate/:activation_token',
  userController.activate
)

userRouter.post(
  '/login',
  userController.login
)

userRouter.post(  // body { credential, clientId }
  'login/google',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.status(202).json(req.user);
  }
)

userRouter.put(
  '/update',
  passport.authenticate('userJWT', { session: false }),
  userController.update
)

userRouter.delete(
  '/delete/:id',
  //passport.authenticate('adminJWT', { session: false }),
  userController.delete
)

export default userRouter