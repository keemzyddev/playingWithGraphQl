const { UserList, MovieList } = require("../fakeData");
const _ = require("lodash");
const resolvers = {
  Query: {
    // all users
    users: () => {
      return UserList;
    },
    // single user by Id
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      // const user = _.find(UserList, { id: id });
      return user;
    },
    // single user by username
    userByName: (parent, args) => {
      const username = args.username;
      const userByName = _.find(UserList, { username });
      return userByName;
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

  //mutation
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUser: (parents, args) => {
      const { id, newName, newAge, newUsername, newNationality } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.name = newName;
          user.age = parseInt(newAge);
          user.username = newUsername;
          user.nationality = newNationality;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
