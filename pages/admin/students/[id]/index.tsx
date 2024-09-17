import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "@/components/adminsidebar";

const StudentDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch student data and their courses from an API (replace with real API calls)
      setStudent({
        id: id,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Mathematics",
      });
      setCourses([
        { id: 1, name: "Mathematics 101", percentage: "75%" },
        { id: 2, name: "Advanced Calculus", percentage: "70%" },
      ]);
    }
  }, [id]);

  const handleCourseChange = (e) => {
    setNewCourse({ name: e.target.value });
  };

  const handleAddCourse = () => {
    setCourses((prevCourses) => [
      ...prevCourses,
      { id: prevCourses.length + 1, name: newCourse.name, percentage: 0 },
    ]);
    setNewCourse({ name: "" });
  };

  const handleEditStudent = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveStudent = () => {
    // Save student data (replace with real API call)
    setEditing(false);
  };

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        {student && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Student Details</h1>

            {editing ? (
              <div className="mb-6 p-4 border rounded bg-white shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
                <div className="flex flex-col mb-4">
                  <label className="mb-2 font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-2 font-medium">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-2 font-medium">Department:</label>
                  <input
                    type="text"
                    name="department"
                    value={student.department}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  onClick={handleSaveStudent}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleEditStudent}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mb-6 p-4 border rounded bg-white shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Student Information
                </h2>
                <div className="mb-4">
                  <strong>Name:</strong> {student.name}
                </div>
                <div className="mb-4">
                  <strong>Email:</strong> {student.email}
                </div>
                <div className="mb-4">
                  <strong>Department:</strong> {student.department}
                </div>
                <button
                  onClick={handleEditStudent}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-4">Courses Assigned</h2>
            <div className="mb-6 p-4 border rounded bg-white shadow-lg">
              <div className="flex mb-4">
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={handleCourseChange}
                  placeholder="New Course Name"
                  className="p-2 border border-gray-300 rounded flex-grow"
                />
                <button
                  onClick={handleAddCourse}
                  className="bg-green-500 text-white px-4 py-2 rounded ml-4"
                >
                  Add Course
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="p-4 border border-gray-200">
                        Course Name
                      </th>
                      <th className="p-4 border border-gray-200">Attendance Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-100">
                        <td className="p-4 border border-gray-200">
                          {course.name}
                        </td>
                        <td className="p-4 border border-gray-200">
                          {course.percentage}
                        </td>
                      </tr>
                    ))}
                    {courses.length === 0 && (
                      <tr>
                        <td
                        //   colSpan="3"
                          className="p-4 text-center text-gray-500"
                        >
                          No courses found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminSidebar>
  );
};

export default StudentDetail;
