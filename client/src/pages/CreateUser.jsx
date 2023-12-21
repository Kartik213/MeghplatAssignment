import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleCheckBox(e) {
    setInputs((prev) => ({ ...prev, isAdmin: e.target.checked }));
  }
  const handleClick = async (e) => {
    e.preventDefault();
    if(inputs.email === ""){
      toast.error("Email can not be empty");
      return ;
    }
    if(inputs.name === ""){
      toast.error("Name can not be empty");
      return ;
    }
    if(inputs.password === ""){
      toast.error("Password cannot be empty")
      return ;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/dashboard/createUser", inputs, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5} className="bg-light p-4 rounded">
          <h1 className="text-center">Create User</h1>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user's name"
                name="name"
                onChange={handleChange}
                autoComplete="on"
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter user's email"
                name="email"
                onChange={handleChange}
                autoComplete="on"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                autoComplete="on"
              />
            </Form.Group>
            <Form.Group controlId="admin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Admin"
                name="admin"
                onChange={handleCheckBox}
                style={{ borderColor: "red" }}
              />
            </Form.Group>
            <Form.Group controlId="submit" className="text-center">
              <Button variant="primary" onClick={handleClick}>
                Create User
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
