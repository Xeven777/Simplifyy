import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const DashboardHome = () => {
  const { currentUser } = useAuth();
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const dynamicGreeting = `${greeting}, ${currentUser.displayName}. 👋`;

  return (
    <>
      <div className="bg-gray-100 flex justify-center">
        <div className="flex justify-center items-center gap-16">
          <Link
            to="/dashboard/url-shortener"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Url Shortener
          </Link>
          <Link
            to="/dashboard/qr-generator"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Qr Generator
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
