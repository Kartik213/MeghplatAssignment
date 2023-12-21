import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if(inputs.email === ""){
        toast.error("Email cannot be empty");
        return ;
      }
      if (inputs.password === "") {
        toast.error("Password cannot be empty");
        return;
      }
      const res = await axios.post("http://localhost:3000/user/login", inputs);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.user.isAdmin);
      localStorage.setItem("name", res.data.user.name);
      if (res.data.user.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4} className="bg-light p-4 rounded">
          <h1 className="text-center mb-4">Login</h1>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                autoComplete="on"
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                autoComplete="on"
                required
              />
            </Form.Group>
            <Form.Group controlId="submit" className="text-center">
              <Button variant="primary" className="mt-3" onClick={handleClick}>
                Login
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
