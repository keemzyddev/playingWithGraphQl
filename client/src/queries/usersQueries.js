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

export const GET_USER_BY_NAME = gql`
  query userByName($username: String!) {
    userByName(username: $username) {
      name
    }
  }
`;

export const GET_USERS_FRAGMENT = gql`
  fragment GetUserFragment on User {
    id
    name
    age
    username
    nationality
  }
`;
