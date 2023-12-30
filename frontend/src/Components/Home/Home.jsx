import React from "react";
import torus from "../../assets/torus.png";
import tringle from "../../assets/tringle.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

const Home = () => {
  return (
    <>
      <section className="relative justify-center w-full min-h-screen flex flex-col gap-4 items-center overflow-x-hidden main-cont">
        <article className="rounded-full p-[2px] text-sm bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="rounded-full px-3 py-1 bg-slate-900">
            New Beta Release✨
          </div>
        </article>

        <div className="w-56 blur-[100px] rounded-full h-32 absolute  bg-purple-700/40 top-56" />
        <h2 className="z-10 text-zinc-100 my-5 text-3xl sm:text-6xl sm:max-w-[750px] text-center font-bold">
          <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-purple-600 to-blue-500 text-transparent bg-clip-text">
            Simplifyy
          </span>{" "}
          your Business Needs
        </h2>

        <p className="text-purple-100/70 md:text-xl text-base sm:max-w-[450px] text-center ">
          Simplify the process of managing your business with our all-in-one
          platform.
        </p>
        <img
          src={torus}
          alt=""
          className="absolute scale-75 opacity-40 bottom-0 md:right-6 -right-52 hover:-rotate-45 hover:scale-90 transition-all duration-500 "
        />
        <img
          src={tringle}
          alt=""
          className="absolute scale-50 opacity-60 top-2 md:left-0 -left-56 hover:rotate-12 hover:scale-75 transition-all duration-500"
        />
        <div className="flex gap-4 mt-4 z-20">
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

      <section className="main-cont2 min-h-[70vh]">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full rounded-3xl"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
            alt="dashboard image"
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
              We created the tools and ideas that brings us together.
            </h2>
            <p className="mb-6 font-light md:text-lg text-gray-400">
              Simplifyy makes it easy for businesses to handle their long urls
              and create QR codes for them on the go.
            </p>
            <div className="flex gap-4 mb-6">
              <Link to="/dashboard/url-shortener">
                <article className="rounded-full p-[2px] text-sm bg-gradient-to-tl from-green-600 via-cyan-300 to-blue-400">
                  <div className="rounded-full px-3 py-1 bg-slate-900">
                    Simply 🔗💫
                  </div>
                </article>
              </Link>
              <Link to="/dashboard/qr-gen">
                <article className="rounded-full p-[2px] text-sm bg-gradient-to-br from-yellow-500 to-red-500">
                  <div className="rounded-full px-3 py-1 bg-slate-900">
                    QRystal 💎
                  </div>
                </article>
              </Link>
            </div>

            <Link
              to={"/signup"}
              className="inline-flex gap-3 p-4 bg-slate-800/40 items-center text-white hover:bg-slate-800/90 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
            >
              Get started
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="relative overflow-hidden bg-cover bg-no-repeat bg-[url('https://img.freepik.com/premium-vector/circuit-technology-background-with-hi-tech-digital-data-connection-system-computer-electronic-desing_29971-728.jpg?w=826')] h-[420px]">
          <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[#080b1496] bg-fixed">
            <div className="flex h-full items-center justify-center">
              <div className="px-6 text-center text-white md:px-12">
                <h2 className="mb-12 text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                  Are you ready to start the
                  <br />
                  Journey with{" "}
                  <span className="bg-gradient-to-br from-cyan-500 via-slate-50 to-cyan-400/30 bg-clip-text text-transparent">
                    Simplifyy
                  </span>
                </h2>
                <Link
                  to="/signup"
                  className="border-2 border-purple-500 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 backdrop-blur rounded-xl"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
