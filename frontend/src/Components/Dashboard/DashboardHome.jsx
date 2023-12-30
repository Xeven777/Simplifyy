import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const DashboardHome = () => {
  const { currentUser } = useAuth();
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = `Heyyyo 😊 ${currentUser.displayName}! Good morning ! Ready for a new day?!⚡😉`;
  } else if (currentHour < 19) {
    greeting = `Holaa 😊 ${currentUser.displayName}! Good afternoon ! Keep the Good Work up 👏🏻😁 `;
  } else {
    greeting = `Hello ${currentUser.displayName} 😊 ! How was was your day ? Hope it went well 🥰`;
  }

  return (
    <>
      <div className="lg:w-[70%] max-w-[90%]">
        <div className="greeting-box text-left md:w-full mt-36 md:pr-[100px] h-fit md:px-8 prounded-xl relative overflow-hidden rounded-xl py-6 px-2 leading-relaxed">
          <h1 className="text-3xl font-medium text-zinc-100 ">{greeting}</h1>
          <h2 className="text-2xl mt-6">What do you want to do today?</h2>
        </div>

        <div className="grid gap-4 py-8 md:grid-cols-2 grid-cols-1">
          <Link
            to="/dashboard/url-shortener"
            className="bg-gray-900 h-48 bg-opacity-30 border-s border-e border-slate-950 transition hover:border-slate-700 text-white font-bold px-6 rounded-2xl text-3xl py-10 simple-box"
          >
            SIMPLY
            <p className="text-sm font-normal py-4">Shorten Links Now</p>
          </Link>
          <Link
            to="/dashboard/qr-gen"
            className="bg-gray-900 h-48 bg-opacity-30 border-s border-e border-slate-950 transition hover:border-slate-700 text-white font-bold px-6 rounded-2xl text-3xl py-10 qrystal-box "
          >
            QRystal
            <p className="text-sm font-normal py-4">Make QR codes now</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
