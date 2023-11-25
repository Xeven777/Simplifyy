import React, { useState } from "react";

const QrGen = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQrCode = async () => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          inputValue
        )}`
      );
      const qrCodeUrl = response.url;
      setQrCodeUrl(qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };


  return (
    <div className="pt-[10rem]">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={generateQrCode}>Generate QR Code</button>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
    </div>
  );
};

export default QrGen;
