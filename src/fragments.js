// deep relationship한 쿼리를 만들고 싶다면 이런식으로 작성하는게 좋다.
export const COMMENT_FRAGMENT= `
  fragment CommentParts on Comment{
    id
    text
    user{
      username
    }
  }
`
// export const USER_FRAGMENT = `
//   fragment UserParts on User{
//     id
//     username
//     email
//     firstName
//     lastName
//     posts{
//       id
//       caption
//     }
//     following{
//       id
//       username
//     }
//   }
//   `;