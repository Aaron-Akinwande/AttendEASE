import AdminSidebar from "@/components/adminsidebar";
import { useRouter } from "next/router";
import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaPlusCircle,
  FaFileAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const router = useRouter();

  const stats = {
    students: 1200,
    lecturers: 45,
    classes: 85,
  };

  return (
    <AdminSidebar>
      <div className="bg-blue-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Stat Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaUserGraduate size={40} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold">{stats.students}</h2>
            <p className="text-gray-600">Total Students</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaChalkboardTeacher
              size={40}
              className="mx-auto text-blue-500 mb-4"
            />
            <h2 className="text-2xl font-bold">{stats.lecturers}</h2>
            <p className="text-gray-600">Total Lecturers</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaBook size={40} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold">{stats.classes}</h2>
            <p className="text-gray-600">Total Classes</p>
          </div>
        </div>

        {/* Quick Action Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/admin/lecturers")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
          >
            <FaPlusCircle size={24} className="mr-2" />
            Add Lecturer
          </button>

          <button
            onClick={() => router.push("/admin/notifications")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
          >
            <FaFileAlt size={24} className="mr-2" />
            All Notifications
          </button>

          <button
            onClick={() => router.push("/admin/students")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
          >
            <FaUserGraduate size={24} className="mr-2" />
            Add Student
          </button>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminDashboard;
