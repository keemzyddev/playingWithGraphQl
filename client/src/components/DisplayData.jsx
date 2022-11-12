import { useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_USER, GET_USERS } from "../queries/usersQueries";

const DisplayData = () => {
  const [userSearch, setUserSearch] = useState("");
  const { loading, data, error } = useQuery(GET_USERS);
  const [fetchUser, { data: userData }] = useLazyQuery(GET_USER);

  if (loading)
    return (
      <div className="spinner-border d-flex justify-items-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Something Went Wrong....</p>;
  console.log(userData);
  return (
    <div>
      {!loading && !error && (
        <table className="table table-hover table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Username</th>
              <th scope="col">Nationality</th>
            </tr>
          </thead>
          {data.users.map((user) => (
            <tbody key={user.id}>
              <tr>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.username}</td>
                <td>{user.nationality}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}

      <div>
        <input
          className="form-control"
          type="text"
          placeholder="1...."
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            fetchUser({
              variables: {
                id: userSearch,
              },
            });
          }}
        >
          GET USER
        </button>
        <div className="container">
          {userData && (
            <div>
              <h1>Name: {userData.user.name}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
