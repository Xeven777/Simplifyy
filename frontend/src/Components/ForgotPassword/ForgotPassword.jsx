import React, { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-3xl font-bold mb-8 text-center">Password Reset</h2>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded relative"
              role="alert"
            >
              {message}
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

            <button
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 duration-75 text-white p-2 rounded"
              type="submit"
            >
              Reset Password
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" className="text-blue-800">Login</Link>
          </div>
        </div>
        <div className="text-center mt-4">
          Need an account? <Link to="/signup" className="text-blue-800">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
