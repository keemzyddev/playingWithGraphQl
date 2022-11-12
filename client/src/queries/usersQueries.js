import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

export const GET_USER = gql`
query getUser($userId: ID!) {
  user(id: $userId) {
    name
    age
  }
}
`;
