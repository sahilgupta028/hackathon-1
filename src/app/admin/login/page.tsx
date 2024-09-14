"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dummy login check
    if (username && password) {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "/"; // Redirect to home page or admin dashboard
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Left Side Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="https://www.greatbusinessschools.org/wp-content/uploads/2020/06/young-doctor-in-uniform-with-stethoscope-and-notebook-in-4173248.jpg"
            alt="Admin login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Forgot your password?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Reset here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
