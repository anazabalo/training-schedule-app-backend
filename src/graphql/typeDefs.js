import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Query {
    hello: String
    users: [User!]!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
  }
`;

export default typeDefs;
