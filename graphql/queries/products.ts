import { gql } from '@apollo/client'

const GET_PRODUCTS = gql`
 query {
  availableProducts {
    id
    name
    price
    rating
    thumbnail
    category
    description
    stock
    rating
    vendor {
      name
      image
      rating
      wallet_address
    }
  }
}
`;

export { 
    GET_PRODUCTS
}