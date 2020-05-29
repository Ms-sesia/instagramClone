import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // auth에서 헤더를 찾는 역할을 함.
  secretOrKey: process.env.JWT_SECRET
}

const verifyUser = async (payload, done) => { // done은 사용자를 찾았을 때 호출하는 함수.
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (error) {
    return done(error, false);
  }
}

export const authenticateJwt = (req, res, next) => passport.authenticate("jwt", { session: false }, (error, user) => {
  if (user) {
    req.user = user;
  }
  next();
})(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser)); // jwtOption 토큰을 입력받아서 정보를 해석하고 해석한 정보를 verifyUser로 전달한다.
passport.initialize();