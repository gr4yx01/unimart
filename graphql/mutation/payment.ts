import { gql } from '@apollo/client'

const CREATE_PAYMENT_SESSION = gql`
   mutation($subaccounts: [Subaccount]) {
  createPaymentSession(subaccounts: $subaccounts) {
    data {
      access_code
      authorization_url
      reference
    }
    status
  }
}
`

export {
    CREATE_PAYMENT_SESSION
}