const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }
  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    userByName(username: String!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }

  input UpdateUserInput {
    id: ID!
    newName: String
    newAge: Int
    newUsername: String
    newNationality: Nationality = BRAZIL
  }

  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput): User
    updateUsername(input: UpdateUsernameInput): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    BRAZIL
    CANADA
    CHILE
    GERMANY
    INDIA
  }
`;

module.exports = { typeDefs };
