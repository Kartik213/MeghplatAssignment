import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="mt-2">
      <Navbar.Brand>Admin DashBoard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => navigate("/newTask")}>Assign task</Nav.Link>
          <Nav.Link onClick={() => navigate("/createUser")}>Create user</Nav.Link>
        </Nav>
        <Button variant="light" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DashboardNavbar;
