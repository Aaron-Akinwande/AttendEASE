import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminSidebar from "@/components/adminsidebar";
import { getRequest, postRequest } from "@/api/apiCall";
import { STUDENTS } from "@/api/apiURL"; // Replace with actual API URL for fetching students
import { queryKeys } from "@/api/queryKey"; // Assuming this contains your query keys
import { useRouter } from "next/router";

const StudentList = () => {

  const router = useRouter();
  const uid: any = typeof window !== 'undefined' && localStorage.getItem("admin_token");


  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    phoneNumber: "",
  });

  // Fetch students using react-query
  const { data: students = [], isLoading, isError } = useQuery({
    queryKey: [queryKeys.getStudents],
    queryFn: async () => await getRequest({ url: STUDENTS(uid) }),
  });

  const addStudentMutation = useMutation({
    mutationFn: async (newStudentData) => {
      await postRequest({ url: STUDENTS(uid), data: newStudentData });
    },
    onSuccess: () => {
      // Invalidate queries to refresh the student list after adding a new student
      queryClient.invalidateQueries({ queryKey: [queryKeys.getStudents] });
      setShowAddForm(false);
      setNewStudent({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        phoneNumber: "",
      });
    },
    onError: (error) => {
      console.error("Error adding student:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddStudent = () => {
    addStudentMutation.mutate(newStudent);
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`;
    return (
      (filterDept ? student.department === filterDept : true) &&
      (searchTerm
        ? fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id.toString().includes(searchTerm)
        : true)
    );
  });

  const viewStudentDetails = (studentId) => {
    router.push(`/admin/students/${studentId}`);
  };

  if (isLoading) {
    return (
      <AdminSidebar>
        <div className="p-6 min-h-screen">Loading...</div>
      </AdminSidebar>
    );
  }

  if (isError) {
    return (
      <AdminSidebar>
        <div className="p-6 min-h-screen">Error loading students.</div>
      </AdminSidebar>
    );
  }

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Student List</h1>

        <div className="flex flex-col md:flex-row justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2 md:mb-0 md:mr-4"
          />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Departments</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Student
        </button>

        {showAddForm && (
          <div className="mb-6 p-4 border rounded bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={newStudent.firstName}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={newStudent.lastName}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium">Department:</label>
              <input
                type="text"
                name="department"
                value={newStudent.department}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={newStudent.phoneNumber}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleAddStudent}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Student
            </button>
          </div>
        )}

        <div className="overflow-x-auto shadow-lg">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="p-4 border border-gray-200">Student ID</th>
                <th className="p-4 border border-gray-200">First Name</th>
                <th className="p-4 border border-gray-200">Last Name</th>
                <th className="p-4 border border-gray-200">Email</th>
                <th className="p-4 border border-gray-200">Phone Number</th>
                <th className="p-4 border border-gray-200">Department</th>
                <th className="p-4 border border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="p-4 border border-gray-200">{student.id}</td>
                  <td className="p-4 border border-gray-200">{student.firstName}</td>
                  <td className="p-4 border border-gray-200">{student.lastName}</td>
                  <td className="p-4 border border-gray-200">{student.email}</td>
                  <td className="p-4 border border-gray-200">{student.phoneNumber}</td>
                  <td className="p-4 border border-gray-200">{student.department}</td>
                  <td className="p-4 border border-gray-200">
                    <button
                      onClick={() => viewStudentDetails(student.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default StudentList;
