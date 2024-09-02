import StudentSidebar from "@/components/studentsidebar";
import React from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

const AttendanceRecordsPage = () => {
  // Sample data for demonstration
  const attendanceHistory = [
    { date: "2024-09-01", status: "Present", remarks: "" },
    { date: "2024-09-02", status: "Absent", remarks: "Medical leave" },
    { date: "2024-09-03", status: "Present", remarks: "" },
    { date: "2024-09-04", status: "Late", remarks: "Arrived 10 minutes late" },
  ];

  return (
    <StudentSidebar>
      <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-200 to-green-300 min-h-screen rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Attendance Records
        </h1>

        {/* Attendance Records Table */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Your Attendance History
          </h2>
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((record, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{record.date}</td>
                  <td className="py-2 flex items-center">
                    {record.status === "Present" ? (
                      <FaCheckCircle className="text-green-500 mr-2" />
                    ) : record.status === "Absent" ? (
                      <FaTimesCircle className="text-red-500 mr-2" />
                    ) : (
                      <FaExclamationCircle className="text-yellow-500 mr-2" />
                    )}
                    {record.status}
                  </td>
                  <td className="py-2">{record.remarks || "No remarks"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentSidebar>
  );
};

export default AttendanceRecordsPage;
