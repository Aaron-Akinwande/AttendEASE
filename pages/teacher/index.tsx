import Sidebar from "@/components/sidebar";
import React from "react";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUsers,
  FaBell,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <Sidebar>
      <div className="min-h-screen grid bg-gradient-to-r from-blue-500 to-green-500 p-8">
        <div className="max-w-4xl md:h-[80vh]  flex flex-col justify-center bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Recent Classes */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaChalkboardTeacher className="text-blue-600 text-2xl mr-4" />
                  <h2 className="text-xl font-semibold text-gray-700">
                    Recent Classes
                  </h2>
                </div>
              </div>
              <ul className="mt-4">
                <li className="text-gray-600">
                  Class 101 - Introduction to Programming
                </li>
                <li className="text-gray-600">Class 102 - Data Structures</li>
                <li className="text-gray-600">Class 103 - Algorithms</li>
              </ul>
            </div>

            {/* Upcoming Lectures */}
            <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-green-600 text-2xl mr-4" />
                  <h2 className="text-xl font-semibold text-gray-700">
                    Upcoming Lectures
                  </h2>
                </div>
              </div>
              <ul className="mt-4">
                <li className="text-gray-600">
                  Advanced JavaScript - Tomorrow at 10 AM
                </li>
                <li className="text-gray-600">
                  Database Management - Friday at 2 PM
                </li>
              </ul>
            </div>

            {/* Overall Attendance */}
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUsers className="text-yellow-600 text-2xl mr-4" />
                  <h2 className="text-xl font-semibold text-gray-700">
                    Overall Attendance
                  </h2>
                </div>
              </div>
              <p className="text-gray-600 mt-4">Attendance Rate: 85%</p>
            </div>

            {/* Notifications */}
            <div className="bg-red-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaBell className="text-red-600 text-2xl mr-4" />
                  <h2 className="text-xl font-semibold text-gray-700">
                    Notifications
                  </h2>
                </div>
              </div>
              <ul className="mt-4">
                <li className="text-gray-600">
                  Reminder: Submit attendance by Friday
                </li>
                <li className="text-gray-600">New message from Admin</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-500 mt-6">
            &copy; 2024 AttendEase. All Rights Reserved.
          </footer>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
