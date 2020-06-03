// 프로필 보기. 그저 유저의 프로필만 보는 것이므로 로그인 토큰 인증은 안해도됨(isAuthenticated가 없어도 됨).
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: (_, args, { request}) => {
      const { id } = args;
      return prisma.user({ id });
    }
  }
}