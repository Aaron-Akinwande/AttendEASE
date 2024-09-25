import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaChalkboardTeacher,
  FaUsers,
  FaSignOutAlt,
  FaBell,
  FaUser,
} from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const Sidebar = ({ children }) => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push(`/login`, `/login`);
    alert("User Logged Out");
  };


  return (
    <div className="flex">
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 p-4">
          <div className="flex items-center justify-center rounded-full">
            <img src="/logo.jfif" alt="AttendEase Logo" className="h-12 w-12 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800 ml-2">
              AttendEase
            </h2>
          </div>
          <button className="md:hidden text-gray-800" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-4">
            <li>
              <a
                href="/teacher"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaHome className="mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            {/* <li>
              <a
                href="/teacher/attendance_list"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <MdOutlineQrCodeScanner  className="mr-3" />
                <span>Attendance</span>
              </a>
            </li> */}
            <li>
              <a
                href="/teacher/classes"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaChalkboardTeacher className="mr-3" />
                <span>Classes</span>
              </a>
            </li>
            {/* <li>
              <a
                href="/teacher/students"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaUsers className="mr-3" />
                <span>Students</span>
              </a>
            </li> */}
            <li>
              <a
                href="/teacher/profile"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaUser className="mr-3" />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a
                href="/teacher/notifications"
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaBell className="mr-3" />
                <span>Notifications</span>
              </a>
            </li>
            <li>
              <a
                // href="/login"
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <FaSignOutAlt className="mr-3" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      <div className="flex-grow md:ml-64">{children}</div>
    </div>
  );
};

export default Sidebar;
