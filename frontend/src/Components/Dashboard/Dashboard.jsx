import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Route, Routes, Link } from "react-router-dom";
import DashboardAbout from "./DashboardAbout";
import DashboardHome from "./DashboardHome";
import DashboardContact from "./DashboardContact"; 
import { useAuth } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import UrlShortener from "./UrlShortener/UrlShortener";
import QrGenerator from "./QrGenerator/QrGenerator";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="m-auto flex flex-col">
          You must be logged in to view this page
          <div className="flex justify-evenly mt-4">
            <Link to="/signup" className="w-20 bg-blue-500 hover:bg-blue-600 duration-75 text-white p-2 rounded text-center">
              Sign Up
            </Link>
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 w-20 duration-75 text-white p-2 rounded text-center">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/dbabout" element={<DashboardAbout />} />
        <Route path="/dbcontact" element={<DashboardContact />} /> 
        <Route path="/qr-generator" element={<QrGenerator />} />
        <Route path="/url-shortener" element={<UrlShortener />} />
      </Routes>
    </>
  );
};

export default Dashboard;