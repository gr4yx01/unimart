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
      subaccount_code
    }
  }
}
`;

export { 
    GET_PRODUCTS
}