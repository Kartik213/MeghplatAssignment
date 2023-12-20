import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import CreateUser from "./pages/CreateUser.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/registerAdmin" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/newTask" element={<CreateTask />} />
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </>
  );
};

export default App;
