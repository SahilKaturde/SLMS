import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      if (value.includes(" ")) {
        setUsernameError("Spaces are not allowed in username.");
      } else {
        setUsernameError("");
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setProfilePic(file);
        if (error) setError("");
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setProfilePic(file);
        if (error) setError("");
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!profilePic) {
      setError("Please upload a profile picture.");
      return;
    }

    if (usernameError) {
      setError("Please fix username errors before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("profile_pic", profilePic);

      const response = await axios.post(
        "http://localhost:8000/api/register/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Registration failed. Please check your details and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-mono">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">SLMS</h1>
        <p className="text-sm text-gray-600 mt-1">
          Smart Library Management System
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-5xl px-4">
        {/* Profile Pic Upload */}
        <div
          className={`w-40 h-40 sm:w-48 sm:h-48 border-4 border-black rounded-xl flex flex-col items-center justify-center cursor-pointer
          ${dragActive ? "bg-blue-100" : "bg-white"} transition`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onButtonClick();
          }}
          aria-label="Upload profile picture by clicking or dragging and dropping an image"
        >
          {profilePic ? (
            <img
              src={URL.createObjectURL(profilePic)}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A10.012 10.012 0 0112 15c2.42 0 4.64.847 6.313 2.245M12 12a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              <p className="text-gray-600 text-center px-2 select-none text-sm">
                Drag & Drop or Click to Upload
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form Card */}
        <div className="border-4 border-black p-6 rounded-xl bg-white w-full max-w-md">
          {error && (
            <div
              className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center font-semibold"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label htmlFor="username" className="block mb-2 font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-2 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  usernameError ? "border-red-500" : "border-black"
                }`}
                required
                autoComplete="username"
                aria-describedby="username-error"
              />
              {usernameError && (
                <p
                  id="username-error"
                  className="text-red-600 text-xs mt-1 font-semibold select-none"
                >
                  {usernameError}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
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
                autoComplete="new-password"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-black text-white font-bold rounded hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isLoading ||
                !formData.username ||
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword ||
                !profilePic ||
                usernameError
              }
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Already registered link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg text-center px-4 mt-10">
        <p className="text-gray-700 text-sm">
          This is the Smart Library Management System developed by Omkar and
          Sahil. It's a project for educational purposes, allowing you to read
          books from a library as well as explore reading materials from the
          web.
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  onRegisterSuccess: PropTypes.func,
};

export default Register;
