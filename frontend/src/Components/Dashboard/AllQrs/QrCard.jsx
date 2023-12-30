import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCircle,
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const QrCard = ({ qr }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const apiKey = import.meta.env.VITE_APP_JSONLINK;
  const apiUrl = `https://jsonlink.io/api/extract?url=${qr.longUrl}&api_key=${apiKey}`;
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
    const api = baseUrl + "/api/qr/delete/" + id;
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
  const dateObj = new Date(qr.date);
  const favicon =
    data && data.favicon ? data.favicon : "../../../assets/icons8-link-30.png";
  const day = dateObj.toDateString();
  const time = dateObj.toLocaleTimeString();
  const title = data && data.title ? data.title : qr.longUrl;
  const siteDesc =
    data && data.description ? data.description : "Shortened using Simply";
  const imageUrl =
    data && data.images && data.images.length > 0
      ? data.images[0]
      : "https://images.unsplash.com/photo-1649290098499-f4148542f2e0?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="flex md:flex-row flex-col gap-4 p-6 border h-full rounded-lg shadow relative z-10 overflow-hidden hover:-translate-y-2 transition-all duration-300">
      <img
        src={imageUrl}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 rounded-lg blur-lg brightness-75 opacity-70"
      />
      <div className="md:min-w-[150px] w-52 mx-auto overflow-hidden">
        <img
          src={`data:image/png;base64,${qr.qrCode}`}
          alt=""
          className="w-full rounded-lg shadow-lg object-cover mb-4"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(qr.shortQRUrl);
            alert("Copied to clipboard");
          }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 mr-2 ml-1"
        >
          Copy
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
      <div className="flex-1">
        <a href={qr.longUrl} target="_blank">
          <h5 className=" text-2xl font-bold tracking-tight text-zinc-50 line-clamp-2 mb-4">
            {title}
          </h5>
        </a>
        <a
          href={qr.shortQRUrl}
          className="mb-3 font-normal text-zinc-100 line-clamp-1"
        >
          {qr.shortQRUrl}
        </a>
        <p className="mb-3 font-normal text-zinc-100">
          Unique Short Code : {qr.urlCode}
        </p>
        <p className="mb-3 font-normal text-zinc-100">
          Total Clicks : {qr.visitCount}
        </p>
        <a
          href={qr.shortQRUrl}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 "
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
      </div>
    </div>
  );
};
export default QrCard;
