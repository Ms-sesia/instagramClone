// like unlike toggle resolver
import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation : {
    toggleLike: async (_, args, {request}) => { // 3번째 인자는 context
      isAuthenticated(request);
      const { postId } = args;  // mutation입력으로 postId를 받아와야한다.
      const { user } = request; // server.js에서 context에 request를 추가했기 때문에 가져올 수 있다.
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      }
      try {
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) { //  post에 like가 있으면 삭제
          await prisma.deleteManyLikes(filterOptions);
        } else { // post에 like가 없을 때 생성
          await prisma.createLike({
            user: { //  like를 한 user연결
              connect: {
                id: user.id
              }
            },
            post: { //  like를 한 postId연결
              connect: {
                id: postId
              }
            }
          })
        }
        return true;
      } catch {
        return false;
      }
    }
  }
}