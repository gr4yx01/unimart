import { gql } from '@apollo/client'

const CREATE_ORDER = gql`
    mutation($items: [Items!]!, $userId: String!, $status: String!, $totalPrice: Int!, $paymentStatus: Boolean!, $hash: String!) {
  createOrder(items: $items, userId: $userId, status: $status, total_price: $totalPrice, payment_status: $paymentStatus, hash: $hash) {
    status
  }
}
`;

const RATE_PRODUCT = gql`
  mutation($id: String!, $rating: Int!) {
  rateProduct(id: $id, rating: $rating) {
    name
    description
    price
    rating
    stock
    thumbnail
  }
}
`

const RATE_VENDOR = gql`
 mutation($id: String!, $rating: Int!) {
  rateVendor(id: $id, rating: $rating) {
    id
    name
  }
}`

export {
    CREATE_ORDER,
    RATE_PRODUCT,
    RATE_VENDOR
}