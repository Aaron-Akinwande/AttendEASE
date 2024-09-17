import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "@/components/adminsidebar";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
  });

  const router = useRouter();

  useEffect(() => {
    // Simulate fetching data from an API (replace with actual API call)
    const fetchedStudents = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Mathematics",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Physics",
      },
      {
        id: 3,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        department: "Chemistry",
      },
      {
        id: 4,
        name: "Robert Green",
        email: "robert.green@example.com",
        department: "Mathematics",
      },
      // Add more students as needed
    ];
    setStudents(fetchedStudents);
    setFilteredStudents(fetchedStudents);
  }, []);

  useEffect(() => {
    let filtered = students;

    if (filterDept) {
      filtered = filtered.filter(
        (student) => student.department === filterDept
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id.toString().includes(searchTerm)
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, filterDept, students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddStudent = () => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setFilteredStudents((prevStudents) => [...prevStudents, newStudent]);
    setShowAddForm(false);
    setNewStudent({ id: "", name: "", email: "", department: "" });
  };

  const viewStudentDetails = (studentId) => {
    router.push(`/admin/students/${studentId}`);
  };

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
              <label className="mb-2 font-medium">Student ID:</label>
              <input
                type="text"
                name="id"
                value={newStudent.id}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={newStudent.name}
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
                <th className="p-4 border border-gray-200">Name</th>
                <th className="p-4 border border-gray-200">Email</th>
                <th className="p-4 border border-gray-200">Department</th>
                <th className="p-4 border border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="p-4 border border-gray-200">{student.id}</td>
                  <td className="p-4 border border-gray-200">{student.name}</td>
                  <td className="p-4 border border-gray-200">
                    {student.email}
                  </td>
                  <td className="p-4 border border-gray-200">
                    {student.department}
                  </td>
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
                  <td 
                //   colSpan="5" 
                  className="p-4 text-center text-gray-500">
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
