import { gql } from '@apollo/client'

const CREATE_USER = gql`
 mutation($name: String!,  $department: String!, $universityId: String!, $level: String!, $phoneNo: String!, $gender: String!, $wallet_address: String!) {
  createUser(name: $name, department: $department, universityId: $universityId, level: $level, phone_no: $phoneNo, gender: $gender, wallet_address: $wallet_address) {
    id
    name
    wallet_address
  }
}
`

export {
    CREATE_USER
}