import { gql } from '@apollo/client'

const CREATE_USER = gql`
 mutation($name: String!, $email: String!, $department: String!, $universityId: String!, $level: String!, $phoneNo: String!, $gender: String!) {
  createUser(name: $name, email: $email, department: $department, universityId: $universityId, level: $level, phone_no: $phoneNo, gender: $gender) {
    id
    email
    name
  }
}
`

export {
    CREATE_USER
}