import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const UrlCards = ({ url }) => {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const apiKey = import.meta.env.VITE_APP_JSONLINK;
  const apiUrl = `https://jsonlink.io/api/extract?url=${url.longUrl}&api_key=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, [refresh]);
  const dateObj = new Date(url.date);
  const favicon = data && data.favicon ? data.favicon : "";
  const day = dateObj.toDateString();
  const time = dateObj.toLocaleTimeString();
  const title = data && data.title ? data.title : url.longUrl;
  const siteDesc =
    data && data.description ? data.description : "Shortened using Simply";
  const imageUrl =
    data && data.images && data.images.length > 0
      ? data.images[0]
      : "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFic3RyYWN0JTIwYXJ0fGVufDB8fDB8fHww";

  return (
    <div className="p-6 border rounded-lg shadow bg-slate-800 border-slate-800 flex overflow-hidden flex-col md:flex-row backdrop-blur bg-opacity-30 z-0">
      <div className="md:min-w-[180px] lg:max-w-[210px] mb-5 md:mb-2 md:me-3">
        <img
          src={imageUrl}
          alt="thumbnail"
          className=" overflow-hidden rounded-md object-cover w-full h-[130px] mb-9"
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
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 mr-3">
          Copy Link
          <FontAwesomeIcon icon={faCopy} className="ms-2" />
        </button>
        <button className="inline-flex items-center px-4 pt-2 pb-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-2">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="flex-shrink-1">
        <a href={url.longUrl} target="_blank" referrerPolicy="noopener">
          <img src={favicon} alt="" className="w-5 h-5 absolute mt-1" />
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
