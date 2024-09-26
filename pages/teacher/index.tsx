import { getRequest } from "@/api/apiCall";
import { LECTURER } from "@/api/apiURL"; // Adjust this URL as needed
import { queryKeys } from "@/api/queryKey";
import Sidebar from "@/components/sidebar"; // Assuming this is the lecturer sidebar component
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaPlusCircle,
  FaBell,
} from "react-icons/fa";

const LecturerDashboard = () => {
  const router = useRouter();
  const uid = typeof window !== "undefined" && localStorage.getItem("admin_token");
  const id = typeof window !== "undefined" && localStorage.getItem("lect_token");


  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetching lecturer data using react-query
  const { data: lecturerData, isSuccess } = useQuery({
    queryKey: [queryKeys.getLecturer, uid],
    queryFn: async () => await getRequest({ url: LECTURER(uid,id) }),
    enabled: !!uid, // Ensure the query only runs if `uid` is available
  });

  useEffect(() => {
    if (isSuccess && lecturerData) {
      setStudents(lecturerData.students || []);
      setCourses(lecturerData.coursesTaught || []);
    }
  }, [lecturerData, isSuccess]);

  return (
    <Sidebar>
      <div className="bg-blue-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Lecturer Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Stat Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaBook size={40} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold">{courses.length}</h2>
            <p className="text-gray-600">Total Courses</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaUserGraduate size={40} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold">{students.length}</h2>
            <p className="text-gray-600">Total Students</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaChalkboardTeacher size={40} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold">12</h2>
            <p className="text-gray-600">Lectures This Week</p>
          </div>
        </div>

        {/* Quick Action Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/teacher/courses")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
          >
            <FaPlusCircle size={24} className="mr-2" />
            All Courses
          </button>

          <button
            onClick={() => router.push("/teacher/notifications")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
          >
            <FaBell size={24} className="mr-2" />
            View Notifications
          </button>

          <button
            onClick={() => router.push("/teacher/profile")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
          >
            <FaUserGraduate size={24} className="mr-2" />
            Manage Profile
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default LecturerDashboard;
