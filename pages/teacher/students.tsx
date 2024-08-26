import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import { FaUserEdit, FaUserMinus, FaPlus } from "react-icons/fa";

const StudentList = () => {
  // State for the list of students
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      attendance: "85%",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      attendance: "92%",
    },
    {
      id: 3,
      name: "Mark Johnson",
      email: "mark.johnson@example.com",
      attendance: "78%",
    },
    {
      id: 4,
      name: "Lucy Brown",
      email: "lucy.brown@example.com",
      attendance: "88%",
    },
  ]);

  // State for new student form
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    attendance: "",
  });

  // Function to handle removal of a student
  const handleRemoveStudent = (id) => {
    const filteredStudents = students.filter((student) => student.id !== id);
    setStudents(filteredStudents);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Function to add a new student to the list
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudent.name && newStudent.email && newStudent.attendance) {
      setStudents([
        ...students,
        {
          id: students.length + 1,
          name: newStudent.name,
          email: newStudent.email,
          attendance: `${newStudent.attendance}%`,
        },
      ]);
      setNewStudent({ name: "", email: "", attendance: "" }); // Reset form
    }
  };

  return (
    <Sidebar>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Student List</h2>

        {/* Form to add a new student */}
        <form className="mb-6" onSubmit={handleAddStudent}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              placeholder="Student Name"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              placeholder="Student Email"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="number"
              name="attendance"
              value={newStudent.attendance}
              onChange={handleInputChange}
              placeholder="Attendance %"
              className="p-2 border rounded w-full"
              required
              min="0"
              max="100"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full md:w-auto"
          >
            <FaPlus className="mr-2" />
            Add Student
          </button>
        </form>

        {/* Student list table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
                <th className="py-3 px-4 text-left">Student ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Attendance</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.email}</td>
                  <td className="py-3 px-4">{student.attendance}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaUserEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveStudent(student.id)}
                    >
                      <FaUserMinus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
};

export default StudentList;
