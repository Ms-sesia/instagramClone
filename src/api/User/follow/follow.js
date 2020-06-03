import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;  // 내가 follow할 아이디
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },   // 본인 아이디
          data: {
            following: {
              connect: {
                id  // 내가 follow할 아이디
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
}