import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

// { Authorization: 'Bearer TOKEN'}
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // auth에서 헤더를 찾는 역할을 함.
  secretOrKey: process.env.JWT_SECRET // passport정보를 암호화하는데 필요한 비밀값 혹은 키값
}
// 이 패턴은 노마드가 만든 것. 잘 기억해두면 함수 분할 할 때 좋아보임.
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
})(req, res, next); // (req, res, next)이전의 내용들이 함수를 리턴하기 때문에 이런식으로 붙여줘야 함수를 실행한다. 실행해야 하는 함수가 graphql함수이다.

passport.use(new Strategy(jwtOptions, verifyUser)); // jwtOption 토큰을 입력받아서 정보를 해석하고 해석한 정보를 verifyUser로 전달한다.
passport.initialize();