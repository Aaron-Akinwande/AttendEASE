import StudentSidebar from "@/components/studentsidebar";
import React from "react";
import { FaBell, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const NotificationsPage = () => {
  // Sample notifications data for demonstration purposes
  const notifications = [
    { message: "Upcoming class reminder: Mathematics 101", type: "info" },
    { message: "Attendance below 75% in Physics 102", type: "warning" },
    { message: "System maintenance on September 15th", type: "alert" },
  ];

  return (
    <StudentSidebar>
      <div className="p-4 sm:p-6 bg-blue-200 rounded-lg min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Notifications
        </h1>

        {/* Notifications List Section */}
        <div className="p-4 bg-white rounded shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Messages and Alerts
          </h2>
          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className={`flex items-center p-3 rounded-lg ${
                  notification.type === "alert"
                    ? "bg-red-100 border-l-4 border-red-500"
                    : notification.type === "warning"
                    ? "bg-yellow-100 border-l-4 border-yellow-500"
                    : "bg-blue-100 border-l-4 border-blue-500"
                }`}
              >
                <div className="flex-shrink-0">
                  {notification.type === "alert" && (
                    <FaExclamationCircle className="text-red-500 mr-3" size={24} />
                  )}
                  {notification.type === "warning" && (
                    <FaExclamationCircle className="text-yellow-500 mr-3" size={24} />
                  )}
                  {notification.type === "info" && (
                    <FaInfoCircle className="text-blue-500 mr-3" size={24} />
                  )}
                </div>
                <div className="flex-grow text-gray-700">{notification.message}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StudentSidebar>
  );
};

export default NotificationsPage;
