import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import UrlCards from "../UrlShortener/UrlCards";

const AllUrls = () => {
  const { currentUser } = useAuth();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const baseUrl =
      import.meta.env.VITE_APP_NODE_ENV === "production"
        ? "https://sl8.vercel.app"
        : "http://localhost:5000";
    const apiUrl = baseUrl + "/api/userUrl/" + currentUser.uid;
    const fetchUrls = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUrls(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="pt-20">
      <h1 className="text-4xl font-bold text-center p-5">All URLs</h1>
      {urls.length > 0 ? (
        <div className="cards-cont grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center px-4 md:px-6 lg:px-10 py-5">
          {urls.map((url) => (
            <UrlCards url={url} />
          ))}
        </div>
      ) : (
        <p>No URLs found for the current user.</p>
      )}
    </div>
  );
};

export default AllUrls;
{
  /* <ul>
          {urls.map((url) => (
            <li key={url._id}>{url.shortUrl}</li>
          ))}
        </ul> */
}
