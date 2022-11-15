import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { DELETE_USER, UPDATE_USER } from "../mutations/usersMutation";
import { useState } from "react";

const UsersData = ({ user }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [username, setUsername] = useState(user.username);
  const [nationality, setNationality] = useState("BRAZIL");

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: user.id },

    //first method of updating after deleting a user
    // refetchQueries: [{ query: GET_USERS }],

    //Another method of Updating the cache after deleting a user
    // update(cache, { data: { deleteUser } }) {
    //   cache.modify({
    //     fields: {
    //       users(existingUserRef, { readField }) {
    //         return existingUserRef.filter(
    //           (userRef) => user.id !== readField("id", userRef)
    //         );
    //       },
    //     },
    //   });
    // },
    
    //third method of updating the cache after deleting a user
    update(cache, { data: { deleteUser } }) {
      const normalizedId = cache.identify({ id: user.id, __typename: "User" });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      input: {
        id: user.id,
        newName: name,
        newAge: parseInt(age),
        newUsername: username,
        newNationality: nationality,
      },
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.age}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder={user.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option onChange={(e) => setNationality(e.target.value)}>
                Nationality
              </option>
              <option value="BRAZIL">BRAZIL</option>
              <option value="CANADA">CANADA</option>
              <option value="CHILE">CHILE</option>
              <option value="GERMANY">GERMANY</option>
              <option value="INDIA">INDIA</option>
            </Form.Select>
            <Button variant="primary mt-3" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <tr>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>{user.username}</td>
        <td>{user.nationality}</td>
        <td className="text-center">
          <button className="btn btn-dark btn-sm" onClick={handleShow}>
            <FaEdit />
          </button>
        </td>
        <td className="text-center">
          <button className="btn btn-danger btn-sm">
            <FaTrashAlt onClick={deleteUser} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default UsersData;
