import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import { Button, Container, Row, Col, Navbar, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const notAdmin = localStorage.getItem("isAdmin") === "false";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const getTask = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/task/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data.task);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <Container>
      {notAdmin ? (
        <Container>
          <Row className="align-items-center">
            <Navbar bg="light" expand="lg" className="mt-2">
              <Navbar.Brand>User Dashboard</Navbar.Brand>
              <Button onClick={handleLogout} variant="light">
                Logout
              </Button>
            </Navbar>
          </Row>
          <Row className="d-flex flex-wrap mt-3">
            {tasks ? (
              tasks.map((task) => (
                <Col key={task._id} md={4} className="mb-3">
                  <TaskCard {...task} />
                </Col>
              ))
            ) : (
              <p>Loading tasks...</p>
            )}
          </Row>
        </Container>
      ) : (
        <Alert variant="danger" className="mt-2">
          Unauthorized
        </Alert>
      )}
    </Container>
  );
};

export default UserDashboard;
