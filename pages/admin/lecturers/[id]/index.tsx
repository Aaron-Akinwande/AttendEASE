import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/adminsidebar';

const LecturerClasses = () => {
  const router = useRouter();
  const { id } = router.query;

  const [lecturer, setLecturer] = useState(null);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]); // List of available courses
  const [selectedCourseId, setSelectedCourseId] = useState(''); // Stores the selected course ID

  useEffect(() => {
    if (id) {
      // Fetch lecturer data and their classes from an API (replace with real API calls)
      setLecturer({
        id: id,
        name: 'Dr. John Doe',
        department: 'Mathematics'
      });

      // Pre-assigned classes (replace with real API calls)
      setAssignedClasses([
        { id: 1, className: 'Mathematics 101', students: 50, sessions: 10 },
        { id: 2, className: 'Advanced Calculus', students: 35, sessions: 12 },
      ]);

      // Available courses for assignment (replace with real API call)
      setAvailableCourses([
        { id: 3, className: 'Linear Algebra', students: 40, sessions: 8 },
        { id: 4, className: 'Statistics 101', students: 45, sessions: 9 },
        { id: 5, className: 'Physics for Engineers', students: 60, sessions: 7 },
      ]);
    }
  }, [id]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value); // Set the selected course ID from the dropdown
  };

  const handleAssignCourse = () => {
    // Find the selected course from the available courses
    const selectedCourse = availableCourses.find(course => course.id === parseInt(selectedCourseId));
    if (selectedCourse) {
      setAssignedClasses(prevClasses => [...prevClasses, selectedCourse]);
      setSelectedCourseId(''); // Reset the dropdown after assignment
    }
  };

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        {lecturer && (
          <div>
            <h1 className="text-2xl font-bold mb-6">
              {lecturer.name}'s Classes
            </h1>
            <div className="overflow-x-auto shadow-lg">
              <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="p-4 border border-gray-200">Class Name</th>
                    <th className="p-4 border border-gray-200">Total Students</th>
                    <th className="p-4 border border-gray-200">Sessions Undertaken</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedClasses.map((classItem) => (
                    <tr key={classItem.id} className="hover:bg-gray-100">
                      <td className="p-4 border border-gray-200">
                        {classItem.className}
                      </td>
                      <td className="p-4 border border-gray-200">
                        {classItem.students}
                      </td>
                      <td className="p-4 border border-gray-200">
                        {classItem.sessions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Form to assign a new course */}
            <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">Assign New Course</h2>
              <div className="grid grid-cols-1 gap-4">
                <select
                  value={selectedCourseId}
                  onChange={handleCourseChange}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a Course</option>
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.className}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAssignCourse}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Assign Course
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminSidebar>
  );
};

export default LecturerClasses;
