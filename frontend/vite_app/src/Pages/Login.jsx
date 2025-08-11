import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import boyImg from "../assets/boy.png";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/token/", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        "Invalid username or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-mono">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        <img 
          src={boyImg} 
          alt="Illustration of a boy reading" 
          className="w-48 md:w-64" 
          aria-hidden="true"
        />
        
        <div className="border-4 border-black p-6 rounded-xl bg-white w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">SLMS</h1>
            <p className="text-sm text-gray-600 mt-1">
              Smart Library Management System
            </p>
          </div>
          
          {error && (
            <div 
              className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center font-semibold"
              role="alert"
            >
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="username"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="current-password"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>
            
            <button
              type="submit"
              className="w-full p-2 bg-black text-white font-bold rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !formData.username || !formData.password}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* New registration link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              New user?{" "}
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
      
      <div className="max-w-lg text-center px-4">
        <p className="text-gray-700 text-sm">
          This is the Smart Library Management System developed by Omkar and Sahil.
          It's a project for educational purposes, allowing you to read books from a library
          as well as explore reading materials from the web.
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default Login;
