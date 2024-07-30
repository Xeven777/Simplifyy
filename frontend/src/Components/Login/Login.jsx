import React, { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.code === "auth/invalid-login-credentials") {
        setError("Wrong email or password");
      } else {
        setError("Email does not exist. Sign Up");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-3xl font-bold mb-8 text-center">Log In</h2>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded"
                required
                ref={emailRef}
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 p-2 w-full border rounded"
                required
                ref={passwordRef}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute text-slate-500 right-1 flex justify-center items-center h-[30px] w-[50px] top-7 cursor-pointer bg-white"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 duration-75 text-white p-2 rounded"
              type="submit"
            >
              Log In
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" className="text-blue-800">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="text-center mt-4">
          Need an account?{" "}
          <Link to="/signup" className="text-blue-800">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
