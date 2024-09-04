import StudentSidebar from "@/components/studentsidebar";
import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";

const DashboardPage = () => {
  // Sample data for demonstration
  const attendanceRecords = [
    { date: "2024-09-01", status: "Present" },
    { date: "2024-09-02", status: "Absent" },
    { date: "2024-09-03", status: "Present" },
  ];

  const upcomingClasses = [
    { course: "Mathematics 101", date: "2024-09-10", time: "10:00 AM" },
    { course: "History 202", date: "2024-09-11", time: "2:00 PM" },
  ];

  const notifications = [
    { message: "Attendance below 75% in Physics 102", type: "alert" },
    { message: "Upcoming quiz in Biology 105", type: "info" },
  ];

  return (
    <StudentSidebar>
      <div className="p-6 rounded-lg bg-blue-200 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Student Dashboard
        </h1>

        {/* Attendance Records Section */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Attendance Records
          </h2>
          <ul>
            {attendanceRecords.map((record, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2 p-2 border-b"
              >
                <span>{record.date}</span>
                <span className="flex items-center">
                  {record.status === "Present" ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {record.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Classes Section */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Upcoming Classes
          </h2>
          <ul>
            {upcomingClasses.map((cls, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2 p-2 border-b"
              >
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  <span>{cls.course}</span>
                </div>
                <span>
                  {cls.date} at {cls.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notifications Section */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Notifications
          </h2>
          <ul>
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2 p-2 border-b"
              >
                <div className="flex items-center">
                  <FaBell
                    className={`mr-2 ${
                      notification.type === "alert"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  />
                  <span>{notification.message}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StudentSidebar>
  );
};

export default DashboardPage;
