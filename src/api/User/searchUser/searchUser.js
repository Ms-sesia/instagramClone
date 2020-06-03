// term 을 이용해서 username, firstName, lastName에서 term에 해당하는 내용을 찾아서 반환.
import { prisma } from "../../../../generated/prisma-client"

export default {
  Query: {
    searchUser: async (_, args) => prisma.users({
      where: {
        OR: [
          { username_contains: args.term },
          { firstName_contains: args.term },
          { lastName_contains: args.term }
        ]
      }
    })
  }
}