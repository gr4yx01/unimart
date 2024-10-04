import { gql } from '@apollo/client'

const GET_ORDERS = gql`
    query($userId: String!) {
  orders(userId: $userId) {
    id
    createdAt
    status
    total_price
    payment_reference
    items {
      amount
      product {
        id
        name
        price
        thumbnail
        vendor {
          id
        }
      }
      confirmed_payment
      out_for_delivery
      delivered
      quantity
    }
  }
}
`

export {
    GET_ORDERS,
}