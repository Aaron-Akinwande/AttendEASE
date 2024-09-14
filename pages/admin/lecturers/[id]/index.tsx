import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/adminsidebar';

const LecturerClasses = () => {
  const router = useRouter();
  const { id } = router.query;

  const [lecturer, setLecturer] = useState(null);
  const [classes, setClasses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    className: '',
    students: 0,
    sessions: 0,
  });

  useEffect(() => {
    // Fetch lecturer data and their classes from an API (replace with real API calls)
    if (id) {
      setLecturer({
        id: id,
        name: 'Dr. John Doe',
        department: 'Mathematics'
      });
      setClasses([
        { id: 1, className: 'Mathematics 101', students: 50, sessions: 10 },
        { id: 2, className: 'Advanced Calculus', students: 35, sessions: 12 },
      ]);
    }
  }, [id]);

  const handleInputChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCourse = () => {
    // Add a new course (In a real scenario, you would send this data to the backend)
    const newId = classes.length + 1;
    setClasses([...classes, { id: newId, ...newCourse }]);
    setNewCourse({ className: '', students: 0, sessions: 0 });
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
                  {classes.map((classItem) => (
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

            {/* Form to add a new course */}
            <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-4">Add New Course</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="className"
                  value={newCourse.className}
                  onChange={handleInputChange}
                  placeholder="Course Name"
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="students"
                  value={newCourse.students}
                  onChange={handleInputChange}
                  placeholder="Total Students"
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="sessions"
                  value={newCourse.sessions}
                  onChange={handleInputChange}
                  placeholder="Class Sessions Undertaken"
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
        )}
      </div>
    </AdminSidebar>
  );
};

export default LecturerClasses;
