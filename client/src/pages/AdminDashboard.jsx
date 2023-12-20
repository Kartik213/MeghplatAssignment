import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import UserWithTaskCard from "../components/UserWithTaskCard";
import DashboardNavbar from "../components/DashboardNavbar";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const admin = localStorage.getItem("isAdmin") === "true";
  const [data, setData] = useState([]);

  const getAllUsersAndTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/dashboard/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.usersWithTasks);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getAllUsersAndTasks();
  }, []);

  return (
    <Container>
      {admin ? (
        <>
          <DashboardNavbar />
          <div>
            {data.map((userWithTasks) => {
              if (!userWithTasks.user.isAdmin) {
                return (
                  <div key={userWithTasks.user._id} md={4} className="mb-3">
                    <UserWithTaskCard {...userWithTasks} />
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : (
        <Alert variant="danger" className="mt-2">
          Unauthorized
        </Alert>
      )}
    </Container>
  );
};

export default AdminDashboard;
