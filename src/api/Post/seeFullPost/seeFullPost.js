import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT, USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id }).user();
      const comments = await prisma.post({
          id
        })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      const likeCount = await prisma.likesConnection({
          where: {
            post: {
              id
            }
          }
        })
        .aggregate()
        .count();
      return {
        post,
        comments,
        likeCount
      }
    }
  }
}