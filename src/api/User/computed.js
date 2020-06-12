import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => { // parent 는 resolver를 call하는 상위 resolver를 보내준다. 여기서는 user
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async ( parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;  // parent에서 id를 가져와서 parentId라는 변수에 넣는다.
      try{ 
        return await prisma.$exists.user({
          AND: [
            {
              id: parentId
            },
            {
              followers_some: {
                id: user.id
              }
            }
          ]
        });
        //return await prisma.$exists.user({  // followers_some과 같은 동작
        //   AND: [
        //     {
        //       id: user.id
        //     },
        //     {
        //       following_some: {
        //         id: parentId
        //       }
        //     }
        //   ]
        // });
      } catch (error) {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
  Post: {
    user: async ({ id }) => await prisma.post({ id }).user(),
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;  // post에서의 ID
      console.log(user.id , id)
      const testLike = await prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          }, 
          {
            post: {
              id
            }
          }
        ]
      });

      console.log(testLike);

      return testLike;
    }
  }
}