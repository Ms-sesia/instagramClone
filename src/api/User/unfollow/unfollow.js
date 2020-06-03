import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;  // 내가 unfollow할 아이디
      const { user } = request; // 나
      try {
        await prisma.updateUser({
          where: { id: user.id },   // 본인의 아이디
          data: {
            following: {
              disconnect: {
                id  // 내가 unfollow할 아이디
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