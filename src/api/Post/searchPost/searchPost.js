// term 을 이용해서 location과 caption에서 term에 해당하는 내용을 찾아서 반환.
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => prisma.posts({
      where: {
        OR: [
          { location_starts_with: args.term },
          { caption_starts_with: args.term }
        ]
      }
    })
  }
}