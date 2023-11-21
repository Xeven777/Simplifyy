import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="m-auto flex flex-col">
          <div className="flex justify-evenly mt-4 gap-20">
            <Link to="/signup" className="w-20 bg-blue-500 hover:bg-blue-600 duration-75 text-white p-2 rounded text-center">
              Sign Up
            </Link>
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 w-20 duration-75 text-white p-2 rounded text-center">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
