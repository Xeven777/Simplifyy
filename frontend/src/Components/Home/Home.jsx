import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <>
      <section className=" relative flex flex-col gap-4 pt-28 items-center md:items-center">
        <article className="rounded-full p-[2px] text-sm bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="rounded-full px-3 py-1 bg-slate-900">
            New Beta Release✨
          </div>
        </article>
        <div className="w-56 blur-[100px] rounded-full h-32 absolute  bg-purple-700/40 top-56" />
        <h2 className=" text-zinc-100 text-3xl sm:text-6xl sm:max-w-[750px] text-center font-bold">
          Simplifyy your Business Needs
        </h2>

        <p className="text-purple-100/70 text-xl sm:max-w-[450px] text-center ">
          Simplify the process of managing your business with our all-in-one
          platform.
        </p>
        <div>
          <Link
            to="/signup"
            className="bg-gradient-to-tr from-blue-800 to-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-xl active:scale-90 transition duration-200 hover:bg-gradient-to-r"
          >
            Sign-up
          </Link>
          <Link
            to="/dashboard"
            className="text-white px-8 py-3 rounded-xl shadow-md hover:shadow-xl active:scale-90 transition duration-200 border border-purple-600 hover:border-purple-100"
          >
            Dashboard <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
