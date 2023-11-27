import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import QrCard from "./QrCard";

const AllQrs = () => {
  const { currentUser } = useAuth();
  const [qrs, setQrs] = useState([]);

  useEffect(() => {
    const baseUrl =
      import.meta.env.VITE_APP_NODE_ENV === "production"
        ? "https://sl8.vercel.app"
        : "http://localhost:5000";
    const apiUrl = baseUrl + "/api/qr/userUrl/" + currentUser.uid;
    const fetchQrs = async () => {
      try {
        const response = await axios.get(apiUrl);
        setQrs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchQrs();
  }, []);

  return (
    <div className="pt-20">
      <h1 className="text-4xl font-bold text-center p-5">All QRs</h1>
      {qrs.length > 0 ? (
        <div className="cards-cont grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center px-4 md:px-6 lg:px-10 py-5">
          {qrs.map((qr) => (
            <QrCard qr={qr} />
          ))}
        </div>
      ) : (
        <p>No QRs found for the current user.</p>
      )}
    </div>
  );
};
export default AllQrs;
