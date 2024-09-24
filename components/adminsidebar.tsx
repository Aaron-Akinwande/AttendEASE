import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaUserShield,
  FaUsers,
  FaFileAlt,
  FaChalkboardTeacher,
  FaRegListAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar Section */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 p-4">
          <div className="flex items-center justify-center rounded-full">
            <img src="/logo.jfif" alt="AttendEase Logo" className="h-12 w-12 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800 ml-2">AdminEase</h2>
          </div>
          <button className="md:hidden text-gray-800" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-grow p-4">
          <ul className="space-y-4">
            <li>
              <a
                href="/admin"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaHome className="mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/lecturers"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaChalkboardTeacher className="mr-3" />
                <span>Manage Lecturers</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/courses"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaRegListAlt className="mr-3" />
                <span>Manage Courses</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/students"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaUsers className="mr-3" />
                <span>Manage Students</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/profile"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaUserShield className="mr-3" />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/notifications"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaFileAlt className="mr-3" />
                <span>Notifications</span>
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaSignOutAlt className="mr-3" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Floating Button for Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow md:ml-64">{children}</div>
    </div>
  );
};

export default AdminSidebar;
