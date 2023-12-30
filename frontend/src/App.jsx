import React from "react";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

const App = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center main-cont">
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
          <AuthProvider>
            <Router>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </Router>
          </AuthProvider>
        </div>
      </div>
    </>
  );
};

export default App;
