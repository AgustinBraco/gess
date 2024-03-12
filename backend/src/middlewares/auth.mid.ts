import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { JWT_SECRET } from '../config/environment';

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


export default passport;