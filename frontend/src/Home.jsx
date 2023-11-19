import { useState } from "react";
import axios from "axios";

function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const urlInDev = "http://localhost:5000/api/url/shorten";
    //backend url in production
    const urlInProd = "https://smply.vercel.app/api/url/shorten";
    const url = import.meta.env.VITE_APP_NODE_ENV === 'production' ? urlInProd : urlInDev;
    try {
      const response = await axios.post(
        url,
        {
          longUrl: longUrl,
        },
        { withCredentials: true, crossDomain: true }
      );

      setShortenedUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1> Simply </h1>
        <h3> a simple link shortener!</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your URL here"
          />
          <button type="submit">SUBMIT</button>
        </form>

        {shortenedUrl && (
          <>
            <div className="result">
              <p>Your shortened link is:</p>
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                {shortenedUrl}
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
