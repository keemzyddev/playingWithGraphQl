import { useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_USER_BY_NAME, GET_USERS } from "../queries/usersQueries";
import AddUsersForm from "./AddUsersForm";
import DisplayMovies from "./DisplayMovies";
import UsersData from "./UsersData";

const DisplayData = () => {
  const [userSearch, setUserSearch] = useState("");
  const { loading, data, error } = useQuery(GET_USERS);
  const [fetchUser, { data: userData, error: userError }] =
  useLazyQuery(GET_USER_BY_NAME);


  if (loading)
    return (
      <div className="spinner-border d-flex justify-items-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Something Went Wrong....</p>;
  console.log(userData);

  const handleSubmit = () => {};

  return (
    <div>
      <AddUsersForm handleSubmit={handleSubmit} />
      <hr />
      {!loading && !error && (
        <table className="table table-hover table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Username</th>
              <th scope="col">Nationality</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          {data.users.map((user) => (
            <tbody key={user.id} >
              <UsersData user={user}/>
            </tbody>
          ))}
        </table>
      )}
      <hr />
      <hr />

      <div>
        <input
          className="form-control"
          type="text"
          placeholder="batman...."
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <button
          className="btn btn-primary my-3"
          onClick={() => {
            fetchUser({
              variables: {
                username: userSearch,
              },
            });
          }}
        >
          GET USER
        </button>
        <div className="container">
          {userData && (
            <div>
              <h1>Name: {userData.userByName.name}</h1>
            </div>
          )}
          {userError && <h1> Movie does not exist</h1>}
        </div>
      </div>
      <hr />
      <hr />
      <DisplayMovies />
    </div>
  );
};

export default DisplayData;
