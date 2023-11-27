import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

function UrlShortener() {
  const { currentUser } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [qr, setQr] = useState("");
  const [qrURL, setQrURL] = useState("");
  const [qrimage, setQrImage] = useState("");
  const [qrsvg, setQrSvg] = useState("");
  const [visitCount, setVisitCount] = useState("");
  const [loading, setLoading] = useState(false);
  // const copyToClipboard = async () => {
  //   try {
  //     await navigator.clipboard.writeText(qr);
  //     alert("URL copied to clipboard!");
  //   } catch (err) {
  //     console.error("Failed to copy URL: ", err);
  //   }
  // };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const urlInDev = "http://localhost:5000/api/qr";
    const urlInProd = "https://sl8.vercel.app/api/qr";
    const url =
      import.meta.env.VITE_APP_NODE_ENV === "production" ? urlInProd : urlInDev;
    const userId = currentUser.uid;
    try {
      const response = await axios.post(
        url,
        {
          longUrl: longUrl,
          userIdFb: userId,
        },
        { withCredentials: true, crossDomain: true }
      );
      setQrURL(response.data.shortQRUrl);
      setQr(response.data.qrCode);
      console.log(response.data);
      setVisitCount(response.data.visitCount);
      const byteCharacters = atob(qr);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      const blobsvg = new Blob([byteArray], { type: "image/svg+xml" });
      setQrImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error generating your QR :", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="s-heading px-4">QRystal</h1>
        <h3 className="text-xl font-medium text-zinc-300 tracking-wide">
          The Easiest QR Generator!
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            className="bg-neutral-800 focus:bg-neutral-900 focus:shadow-lg focus:outline-none focus:ring-1 m-3 py-2 px-3 rounded-md lg:w-[400px] "
            type="text"
            name="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your URL to encode here"
          />
          <button
            className="shadow__btn text-zinc-50 px-6 shadow-lg text-xl active:scale-95 m-5 cursor-crosshair"
            type="submit"
          >
            Generate
          </button>
        </form>
        {qrURL && (
          <>
            <div className="result">
              <p>Your QR Code:</p>
              <div className="flex items-center justify-center mt-2 w-[400px]">
                <a
                  href={qrURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-fuchsia-700 bg-opacity-20 py-1 px-3 border-purple-900 border-[1px] hover:text-fuchsia-400 hover:bg-opacity-10 transition text-md"
                >
                  <img src={`data:image/png;base64,${qr}`} alt="QR Code" />
                </a>

                <a href={qrimage} download="QRystalCode.png">
                  {" "}
                  Download{" "}
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UrlShortener;
