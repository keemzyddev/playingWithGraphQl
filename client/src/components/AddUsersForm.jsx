import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../mutations/usersMutation";
import { GET_USERS } from "../queries/usersQueries";

const AddUsersForm = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("BRAZIL");

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || age === "" || username === "" || nationality === "") {
      alert("Please fill in all fields");
    }
    createUser({ variables: { input: { name, age: parseInt(age), username, nationality } } });
  };

  return (
    <>
      <Button size="lg" variant="primary mt-3" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
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
    </>
  );
};

export default AddUsersForm;
