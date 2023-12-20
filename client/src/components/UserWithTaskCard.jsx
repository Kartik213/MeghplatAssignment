import React from "react";
import { Table, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserWithTaskCard = ({ user, tasks }) => {
  const navigate = useNavigate();
  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/dashboard/deleteTask/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/dashboard/deleteUser/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Card className="container-md mt-5">
      <Card.Header className="m-1 d-flex justify-content-between align-items-center">
        <div>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
        <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
          Delete User
        </Button>
      </Card.Header>
      {tasks.length === 0 ? (
        <Card.Body>
          <h3>No task Assigned</h3>
        </Card.Body>
      ) : (
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned By</th>
                <th>Delete Task</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(({ _id, title, description, assignedBy }) => (
                <tr key={_id}>
                  <td>{title}</td>
                  <td>{description}</td>
                  <td>{assignedBy}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteTask(_id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      )}
    </Card>
  );
};

export default UserWithTaskCard;
