import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../../Context/AuthContext";

const AllUrls = () => {
  const { currentUser } = useAuth();
  const [urls, setUrls] = useState([]);
  
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_APP_NODE_ENV === "production" ? "https://smply.vercel.app" : "http://localhost:5000";
    const apiUrl = baseUrl+"/api/userUrl/" + currentUser.uid; 
    const fetchUrls = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUrls(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, [currentUser.uid]); 

  return (
    <div className='pt-20'>
      <h1>All URLs</h1>
      {urls.length > 0 ? (
        <ul>
          {urls.map((url) => (
            <li key={url._id}>{url.shortUrl}</li>
          ))}
        </ul>
      ) : (
        <p>No URLs found for the current user.</p>
      )}
    </div>
  );
};

export default AllUrls;
