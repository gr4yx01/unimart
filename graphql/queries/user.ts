import { gql } from '@apollo/client';

const USER_PROFILE = gql`
    query($userId: String!) {
  user(id: $userId) {
    id
    name
    email
    level
    phone_no
    university {
      name
    }
  }
}
`

export { USER_PROFILE }