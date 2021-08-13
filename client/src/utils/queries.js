import { gql } from '@apollo/client';

export const QUERY_DISHES = gql`
  query getDishes($culture: ID) {
    dishes(culture: $culture) {
      _id
      name
      description
      price
      quantity
      image
      culture {
        _id
        name
        description
        image
        cuisine
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($dishes: [ID]!) {
    checkout(dishes: $dishes) {
      session
    }
  }
`;

export const QUERY_ALL_DISHES = gql`
  {
    dishes {
      _id
      name
      description
      price
      quantity
      culture {
        name
        cuisine
      }
    }
  }
`;

export const QUERY_CULTURES = gql`
  {
    cultures {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        dishes {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
