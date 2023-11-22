import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../../Context/AuthContext";

const AllUrls = () => {
  const { currentUser } = useAuth();
  const [urls, setUrls] = useState([]);
  
  useEffect(() => {
    console.log(currentUser.uid);
    const urlInDev = "http://localhost:5000/api/urls";
    const fetchUrls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/urls/'+currentUser.uid); // Replace '/api/urls' with your backend API endpoint
        setUrls(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div>
      <h1>All URLs</h1>
      <ul>
        {urls.map((url) => (
          <li key={url.id}>{url.shortenedUrl}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllUrls;
