// Login Secret Create
import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      console.log(request.user);
      const { email } = args;
      const loginSecret = generateSecret(); // 형 500개 명 500개 중 무작위 단어 2가지 (형용사, 명사)
      try { // email 전송
        throw Error(); 
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email }});
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
}