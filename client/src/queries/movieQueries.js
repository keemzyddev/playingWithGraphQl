import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query getMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

export const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;
