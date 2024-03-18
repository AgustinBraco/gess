import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as CustomStrategy } from 'passport-custom';
import { OAuth2Client } from 'google-auth-library';

import { JWT_SECRET, GOOGLE_CLIENT_ID } from '../config/environment';
import userDto from '../dtos/user.dto';
import userHelper from '../helpers/user.helper';

passport.use(
  'userJWT',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        if (!payload.id) {
          return done("Invalid token / User not logged", false);
        }
        return done(null, payload);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'google',
  new CustomStrategy(async (req, done) => {
    try {
      const { credential, clientId } = req.body;
      if (clientId !== process.env.GOOGLE_CLIENT_ID) {
        return done("Invalid clientId", false);
      }
      const client = new OAuth2Client(clientId);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return done("User not logged", false);
      }
      const user = await userDto.login(payload.email, '');
      if (!user) {
        const newUser = await userDto.register({
          username: payload.name ? payload.name : payload.email,
          password: new Date().toString(),
          email: payload.email,
          phone: '',
          role: 'USUARIO',
          active: true,
          google_registered: true
        })
        const token = userHelper.createJWT(newUser.id, newUser.role);
        return done(null, { token, user: newUser });
      } else {
        const token = userHelper.createJWT(user.id, user.role);
        return done(null, { token, user });
      }
    } catch (error) {
      return done(error);
    }
  })
);


export default passport;