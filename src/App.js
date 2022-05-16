import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DoctorPage from "./components/DoctorPage";
import Appointments from "./components/Appointments";
function App() {
  return (
    <Router>
      <div className="App">
        {localStorage.getItem("user") ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:userID" element={<DoctorPage />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
