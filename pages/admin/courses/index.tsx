import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/adminsidebar';

const CoursesList = () => {
  const router = useRouter();

 
  const [courses, setCourses] = useState([
    { courseId: 1, courseName: 'Mathematics 101', courseLecturer: 'Dr. John Doe', totalSessions: 10 },
    { courseId: 2, courseName: 'Physics 202', courseLecturer: 'Prof. Jane Smith', totalSessions: 12 },
    { courseId: 3, courseName: 'Chemistry 303', courseLecturer: 'Dr. Alice Brown', totalSessions: 8 },
  ]);

 
  const [lecturers, setLecturers] = useState([
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Prof. Jane Smith' },
    { id: 3, name: 'Dr. Alice Brown' },
    { id: 4, name: 'Prof. Mark White' }
  ]);

  
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    courseLecturer: '',
    totalSessions: ''
  });

  const handleRowClick = (courseId) => {
    router.push(`/admin/courses/${courseId}`); 
  };

  const handleInputChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCourse = () => {
    const id = courses.length + 1;
    setCourses([...courses, { ...newCourse, courseId: id, totalSessions: parseInt(newCourse.totalSessions) }]);
    setNewCourse({ courseName: '', courseLecturer: '', totalSessions: '' });
  };

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Courses List</h1>

       
        <div className="overflow-x-auto shadow-lg">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="p-4 border border-gray-200">Course Name</th>
                <th className="p-4 border border-gray-200">Course Lecturer</th>
                <th className="p-4 border border-gray-200">Total Sessions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.courseId}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(course.courseId)}
                >
                  <td className="p-4 border border-gray-200">{course.courseName}</td>
                  <td className="p-4 border border-gray-200">{course.courseLecturer}</td>
                  <td className="p-4 border border-gray-200">{course.totalSessions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form to add a new course */}
        <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add New Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="courseName"
              value={newCourse.courseName}
              onChange={handleInputChange}
              placeholder="Course Name"
              className="p-2 border border-gray-300 rounded"
            />

            {/* Dropdown for selecting course lecturer */}
            <select
              name="courseLecturer"
              value={newCourse.courseLecturer}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Select a Lecturer</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.name}>
                  {lecturer.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="totalSessions"
              value={newCourse.totalSessions}
              onChange={handleInputChange}
              placeholder="Total Sessions"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleAddCourse}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Course
          </button>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default CoursesList;
