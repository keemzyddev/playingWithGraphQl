const { UserList, MovieList } = require("../fakeData");
const _ = require("lodash");
const resolvers = {
  Query: {
    // all users
    users: () => {
      return UserList;
    },
    // single user
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
        // all movies
    movies: () => {
      return MovieList;
    },
    // single movie
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  //favoriteMovies
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication > +2000 && movie.yearOfPublication <= 2010
      );
    },
  },
};

module.exports = { resolvers };
