import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes, Link } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import DashboardContact from "./DashboardContact";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import UrlShortener from "./UrlShortener/UrlShortener";
import AllUrls from "./AllUrls/AllUrls";
import QrGen from "./QrGen";
import AllQrs from "./AllQrs/AllQrs";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center w-full">
        <div className="m-auto flex flex-col">
          You must be logged in to view this page
          <div className="flex justify-evenly mt-4">
            <Link
              to="/signup"
              className="w-20 bg-fuchsia-500 hover:bg-fuchsia-600 duration-75 text-white p-2 rounded text-center"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-fuchsia-500 hover:bg-fuchsia-600 w-20 duration-75 text-white p-2 rounded text-center"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/qr-gen" element={<QrGen />} />
        <Route path="/dbcontact" element={<DashboardContact />} />
        <Route path="/all-urls" element={<AllUrls />} />
        <Route path="/url-shortener" element={<UrlShortener />} />
        <Route path="/all-qrs" element={<AllQrs />} />
      </Routes>
    </>
  );
};

export default Dashboard;
