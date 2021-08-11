const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Culture {
    _id: ID
    name: String
    description: String
    image: String
    cuisine: String
  }

  type Dish {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    culture: Culture
  }

  type Order {
    _id: ID
    purchaseDate: String
    dishes: [Dish]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    cultures: [Culture]
    dishes(culture: ID, name: String): [Dish]
    dish(_id: ID!): Dish
    user: User
    order(_id: ID!): Order
    checkout(dishes: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(dishes: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateDish(_id: ID!, quantity: Int!): Dish
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
