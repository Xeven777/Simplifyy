import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";

function UrlShortener() {
  const { currentUser } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const urlInDev = "http://localhost:5000/api/url/shorten";
    const urlInProd = "https://sl8.vercel.app/api/url/shorten";
    const url =
      import.meta.env.VITE_APP_NODE_ENV === "production" ? urlInProd : urlInDev;
    const userId = currentUser.uid;
    console.log(userId);
    try {
      const response = await axios.post(
        url,
        {
          longUrl: longUrl,
          userIdFb: userId
        },
        { withCredentials: true, crossDomain: true }
      );
      setShortenedUrl(response.data.shortUrl);
      setClickCount(response.data.clickCount);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="s-heading px-4">Simply</h1>
        <h3 className="text-xl font-medium text-zinc-300 tracking-wide">A simple link shortener!</h3>
        <form onSubmit={handleSubmit}>
          <input
          className="bg-neutral-800 focus:bg-stone-900 focus:shadow-lg focus:outline-none focus:ring-1 m-3 py-2 px-3 rounded-md w-[400px]"
            type="text"
            name="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your URL here"
          />
          <button className="shadow__btn text-zinc-50 px-6 shadow-lg text-xl active:scale-95 m-5" type="submit">Shorten</button>
        </form>

        {shortenedUrl && (
          <>
            <div className="result">
              <p>Your shortened link is:</p>
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                {shortenedUrl}
              </a>
            </div>
            <div className="click-count">
              <p>Click count: {clickCount}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UrlShortener;
