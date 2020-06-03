import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({ 
          where: { id: user.id },
          data: { loginSecret: ""}
        })
        return generateToken(user.id);  // 이메일로 인증을 거치면 토큰을 발급해준다.
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
}