import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LibraryLogin({ onLoginSuccess }) {
  const [form, setForm] = useState({
    libraryName: "",
    libraryId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputClass =
    "w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const cardClass =
    "border-4 border-black p-4 sm:p-6 rounded-xl bg-white w-full max-w-md mx-4";
  const btnPrimary =
    "w-full p-2 bg-black text-white font-bold rounded hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed";

  const validateForm = () => {
    if (!form.libraryName.trim() || !form.libraryId.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setError("");
    setIsLoading(true);
    try {
      // Example login request
      // const resp = await axios.post("http://localhost:8000/api/library/login/", form);
      // onLoginSuccess?.(resp.data);

      alert("Login successful! ✅");
    } catch (err) {
      const msg =
        err.response?.data?.detail || "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-mono text-[15px] text-black flex flex-col">
      {/* App title */}
      <div className="text-center py-4 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold">SLMS</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Smart Library Management System
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-md mt-2 mb-2 p-2 bg-red-100 text-red-700 rounded text-center font-semibold border border-red-300 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Login Card */}
      <main className="flex-grow flex items-center justify-center px-2">
        <div className={cardClass}>
          <h2 className="text-lg font-bold mb-4">Library Login</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label
                className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base"
                htmlFor="lib-name"
              >
                Library Name *
              </label>
              <input
                id="lib-name"
                className={inputClass}
                value={form.libraryName}
                onChange={(e) =>
                  setForm({ ...form, libraryName: e.target.value })
                }
                placeholder="Sahyadri Public Library"
              />
            </div>
            <div>
              <label
                className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base"
                htmlFor="lib-id"
              >
                Library ID *
              </label>
              <input
                id="lib-id"
                className={inputClass}
                value={form.libraryId}
                onChange={(e) =>
                  setForm({ ...form, libraryId: e.target.value })
                }
                placeholder="LIB123"
              />
            </div>
            <div>
              <label
                className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base"
                htmlFor="password"
              >
                Password *
              </label>
              <input
                id="password"
                type="password"
                className={inputClass}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className={btnPrimary}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-700">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="max-w-lg text-center px-4 mx-auto my-4 sm:my-6">
        <p className="text-gray-700 text-xs sm:text-sm">
          This is the Smart Library Management System developed by Omkar and
          Sahil. It's a project for educational purposes.
        </p>
      </div>
    </div>
  );
}

LibraryLogin.propTypes = {
  onLoginSuccess: PropTypes.func,
};
