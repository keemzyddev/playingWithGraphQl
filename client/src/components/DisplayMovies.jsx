import { useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_MOVIE_BY_NAME, GET_MOVIES } from "../queries/movieQueries";

const DisplayMovies = () => {
  const [movieSearch, setMovieSearch] = useState("");
  const { loading, data, error } = useQuery(GET_MOVIES);
  const [fetchMovie, { data: movieData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  console.log(movieData);
  if (loading)
    return (
      <div className="spinner-border d-flex justify-items-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Something Went Wrong....</p>;
  return (
    <div>
      {!loading && !error && (
        <table className="table table-hover table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">yearOfPublication</th>
              <th scope="col">isInTheaters</th>
            </tr>
          </thead>
          {data.movies.map((movie) => (
            <tbody key={movie.id}>
              <tr>
                <th scope="row">{movie.id}</th>
                <td>{movie.name}</td>
                <td>{movie.yearOfPublication}</td>
                <td>{movie.isInTheaters ? "True" : "False"}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}

      <div>
        <input
          className="form-control"
          type="text"
          placeholder="God of War...."
          onChange={(e) => {
            setMovieSearch(e.target.value);
          }}
        />
        <button
          className="btn btn-primary my-3"
          onClick={() => {
            fetchMovie({
              variables: { name: movieSearch },
            });
          }}
        >
          GET MOVIE
        </button>
        <div className="container">
          {movieData && (
            <div>
              <h1>Movie Name: {movieData.movie.name}</h1>
            </div>
          )}
          {movieError && <h1> Movie does not exist</h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayMovies;
