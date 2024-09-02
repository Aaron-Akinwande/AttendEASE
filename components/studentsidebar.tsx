import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  FaHome,
  FaUser,
  FaBook,
  FaBell,
  FaSignOutAlt,
  FaTimes,
  FaHamburger,
  FaBars,
} from "react-icons/fa";

const StudentSidebar = ({ children }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-blue-500 to-green-500 p-5 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <div className="flex items-center justify-center p-3">
          <img src="/logo.jfif" alt="AttendEase Logo" className="h-12 w-12" />

          <div className="text-2xl font-bold text-gray-800 ml-2">AttendEase</div>
        </div>
        <nav>
          <ul>
            <li
              className="mb-4"
              onClick={() => {
                router.push("/student");
              }}
            >
              <div className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded cursor-pointer">
                <FaHome />
                <span>Dashboard</span>
              </div>
            </li>
            <li
              className="mb-4"
              onClick={() => {
                router.push("/student/profile");
              }}
            >
              <div className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded cursor-pointer">
                <FaUser />
                <span>Profile</span>
              </div>
            </li>
            <li
              className="mb-4"
              onClick={() => {
                router.push("/student/records");
              }}
            >
              <div className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded cursor-pointer">
                <FaBook />
                <span>Records</span>
              </div>
            </li>
            <li
              className="mb-4"
              onClick={() => {
                router.push("/student/notifications");
              }}
            >
              <div className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded cursor-pointer">
                <FaBell />
                <span>Notifications</span>
              </div>
            </li>
            <li
              className="mt-auto"
              onClick={() => {
                router.push("/login");
              }}
            >
              <div className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded cursor-pointer">
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-6 bg-gray-100 ">{children}</div>

      {/* Mobile Hamburger Menu */}
      <button
        className={`fixed z-50 text-white md:hidden ${
          isOpen ? "top-4 right-4" : "top-4 left-4"
        } ${isOpen ? "text-red-500" : "text-blue-500"} p-2 rounded-full`}
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
};

export default StudentSidebar;
