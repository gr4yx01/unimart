import { gql } from '@apollo/client'

const GET_PRODUCTS = gql`
 query {
  availableProducts {
    name
    price
    rating
    thumbnail
    category
    stock
    rating
    vendor {
      name
      image
      rating
    }
  }
}
`;

export { 
    GET_PRODUCTS
}