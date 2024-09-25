import { login } from "@/api/apiCall";
import { ADMIN_LOGIN, LECT_LOGIN } from "@/api/apiURL";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [userRole, setUserRole] = useState("admin");

  const adminMutation = useMutation({
    mutationFn: async (newLogin: any) =>
      await login({ url: ADMIN_LOGIN, data: newLogin }),
    onSuccess: (data) => {
      console.log(data);
      console.log("Login Success");
      router.push(`/${userRole}`);
      localStorage.setItem("admin_token", data.id);
    },
  });

  const lectMutation = useMutation({
    mutationFn: async (newLogin: any) =>
      await login({ url: LECT_LOGIN, data: newLogin }),
    onSuccess: (data) => {
      console.log(data);
      console.log("Login Success");
      router.push(`/${userRole}`);
      localStorage.setItem("admin_token", data.adminId)
    },
  });

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    if (userRole === "admin") {
      adminMutation.mutate({
        email: state.email,
        password: state.password,
      });
    } else {
      lectMutation.mutate({
        email: state.email,
        password: state.password,
      });
    }
  };

  const handleClick = () => {
    router.push(`/${userRole}`);
  };

  return (
    <div className="min-h-screen bg-blue-500  flex items-center justify-center">
      <div className="bg-white h-[80vh] p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.jfif" alt="AttendEase Logo" className="h-12 w-12" />
          <h2 className="text-2xl font-bold text-gray-800 ml-2">AttendEase</h2>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Login to Your Account
        </h3>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setUserRole("admin")}
            className={`px-4 py-2 rounded-l-md ${
              userRole === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setUserRole("teacher")}
            className={`px-4 py-2 rounded-r-md ${
              userRole === "teacher"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Teacher
          </button>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="flex items-center border-2 rounded-md">
            <FaUser className="text-gray-500 ml-3" />
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex items-center border-2 rounded-md">
            <FaLock className="text-gray-500 ml-3" />
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?
            <a href="/register" className="text-blue-600 hover:underline ml-1">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
