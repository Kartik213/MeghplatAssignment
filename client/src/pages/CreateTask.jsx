import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTask = () => {
  const [inputs, setInputs] = useState({
    title: "",
    email: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if(inputs.email === ""){
      toast.error("Email can not be empty");
      return ;
    }
    if(inputs.title === ""){
      toast.error("Title is required");
      return ;
    }
    if(inputs.description === ""){
      toast.error("Description is required")
      return ;
    }
    const token = localStorage.getItem("token");
    const assignedBy = localStorage.getItem("name");
    const updatedInputs = { ...inputs, assignedBy };
    try {
      await axios.post(
        "http://localhost:3000/dashboard/newTask",
        updatedInputs,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5} className="bg-light p-4 rounded">
          <h1 className="text-center mb-4">Assign New Task</h1>
          <Form>
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
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                onChange={handleChange}
                autoComplete="on"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                name="description"
                onChange={handleChange}
                autoComplete="on"
                rows={3}
              />
            </Form.Group>
            <Form.Group controlId="submit" className="text-center">
              <Button variant="primary" className="mt-3" onClick={handleClick}>
                Assign Task
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTask;
