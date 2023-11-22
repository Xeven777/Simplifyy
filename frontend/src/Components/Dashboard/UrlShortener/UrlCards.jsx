import React from "react";
const UrlCards = ({ url }) => {
  return (
    <div className="max-w-sm p-6 border  rounded-lg shadow bg-slate-800 border-slate-700 ">
      <a href={url.longUrl}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-50 line-clamp-2 pb-3">
          {url.longUrl}
        </h5>
      </a>
      <p className="mb-3 font-normal text-zinc-300 line-clamp-1 cursor-default">
        {url.shortUrl}
      </p>
      <p className="mb-3 font-normal text-zinc-300 cursor-default">
        Unique Short Code : {url.urlCode}
      </p>
      <p className="mb-3 font-normal text-zinc-300 cursor-default">
        Total Clicks : {url.clickCount}
      </p>
      <a
        href={url.shortUrl}
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
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};
export default UrlCards;