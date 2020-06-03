// user정보 수정.(내 프로필 수정)
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: {id: user.id},
        data: {
          username,
          email,
          firstName,
          lastName,
          bio
        }
      })
    }
  }
}