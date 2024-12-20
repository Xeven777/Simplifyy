import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCircle,
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UrlCards = ({ url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const apiKey = import.meta.env.VITE_APP_JSONLINK;
  const apiUrl = `https://jsonlink.io/api/extract?url=${url.longUrl}&api_key=${apiKey}`;
  const baseUrl =
    import.meta.env.VITE_APP_NODE_ENV === "production"
      ? "https://sl8.vercel.app"
      : "http://localhost:5000";
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchMetadata();
  }, []);
  const deleteUrl = async (id) => {
    setLoading(true);
    const api = baseUrl + "/api/url/delete/" + id;
    try {
      const response = await fetch(api, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      } else {
        setLoading(false);
        setDeleted(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const dateObj = new Date(url.date);
  const favicon =
    data && data.favicon ? data.favicon : "../../../assets/icons8-link-30.png";
  const day = dateObj.toDateString();
  const time = dateObj.toLocaleTimeString();
  const title = data && data.title ? data.title : url.longUrl;
  const siteDesc =
    data && data.description ? data.description : "Shortened using Simply";
  const imageUrl =
    data && data.images && data.images.length > 0
      ? data.images[0]
      : "https://images.unsplash.com/photo-1649290098499-f4148542f2e0?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className={`p-6 border rounded-lg shadow bg-slate-900 border-slate-800 flex overflow-hidden flex-col md:flex-row backdrop-blur bg-opacity-30 z-0 ${
        deleted ? "hidden" : ""
      }`}
    >
      <div className="md:min-w-[180px] lg:max-w-[210px] mb-5 md:mb-2 md:me-3 ">
        <img
          src={imageUrl}
          alt="thumbnail"
          className="overflow-hidden rounded-lg object-cover w-full h-[130px] mb-9"
        />
        <a
          target="_blank"
          href={url.shortUrl}
          className="inline-flex items-center md:px-6 px-4 py-2 text-sm font-medium  text-white bg-fuchsia-600 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 mb-3 mr-3 md:min-w-full text-center"
        >
          Visit link
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        <button
          onClick={() => {
            navigator.clipboard.writeText(url.shortUrl);
            alert("Copied to Clipboard");
          }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 mr-3"
        >
          Copy Link
          <FontAwesomeIcon icon={faCopy} className="ms-2" />
        </button>
        <button
          className="inline-flex items-center px-4 pt-2 pb-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-2"
          onClick={() => deleteUrl(url._id)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faCircle} />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </button>
      </div>

      <div className="flex-shrink-1">
        <a href={url.longUrl} target="_blank" referrerPolicy="noopener">
          <img src={favicon} alt="" className="w-5 h-5 absolute mt-1 rounded" />
          <h5 className="text-xl font-bold tracking-tight text-zinc-50 line-clamp-2 md:line-clamp-1 mb-3 ml-6">
            {title}
          </h5>
          <p className="line-clamp-3 md:line-clamp-2  mb-4">{siteDesc}</p>
        </a>
        <ul className="list-none">
          <li className="mb-3 text-zinc-300 line-clamp-2 md:line-clamp-1  text-sm">
            Original :{" "}
            <a href={url.longUrl} className="text-fuchsia-400">
              {url.longUrl}
            </a>
          </li>
          <li className="mb-3 text-sm text-zinc-300 line-clamp-2 md:line-clamp-1  ">
            Shortened Link :{" "}
            <a href={url.shortUrl} className="text-fuchsia-400">
              {url.shortUrl}
            </a>
          </li>
          <li className="mb-3 text-sm text-zinc-300 line-clamp-1 ">
            Day : {day} {"     "}
            Time: {time}
          </li>
          <li className="mb-3 text-sm text-zinc-300 ">
            Unique Short Code : {url.urlCode}
          </li>
          <li className="mb-3 text-sm text-zinc-300">
            <FontAwesomeIcon icon={faChartLine} /> Total Clicks :{" "}
            {url.clickCount}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default UrlCards;
