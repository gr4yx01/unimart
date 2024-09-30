import { gql } from '@apollo/client'

const CREATE_ORDER = gql`
    mutation($items: [Items!]!, $userId: String!, $status: String!, $totalPrice: Int!, $paymentStatus: Boolean!, $paymentReference: String!) {
  createOrder(items: $items, userId: $userId, status: $status, total_price: $totalPrice, payment_status: $paymentStatus, payment_reference: $paymentReference) {
    status
  }
}
`;

export {
    CREATE_ORDER
}