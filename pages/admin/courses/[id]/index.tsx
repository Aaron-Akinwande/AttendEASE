import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/adminsidebar';

const CourseStudents = () => {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch course data and enrolled students from an API (replace with real API calls)
    if (id) {
      setCourse({
        id: id,
        name: 'Mathematics 101',
        lecturer: 'Dr. John Doe',
        totalSessions: 10,
      });
      setStudents([
        { id: 1, name: 'John Doe', attendancePercentage: 80 },
        { id: 2, name: 'Jane Smith', attendancePercentage: 90 },
        { id: 3, name: 'Jack Dane', attendancePercentage: 75 },
      ]);
    }
  }, [id]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        {course && (
          <div>
            <h1 className="text-2xl font-bold mb-6">
              Students in {course.name}
            </h1>
            <h2 className="text-lg mb-4">Lecturer: {course.lecturer}</h2>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded mb-4"
            />

            <div className="overflow-x-auto shadow-lg">
              <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="p-4 border border-gray-200">Student Name</th>
                    <th className="p-4 border border-gray-200">Attendance Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100">
                      <td className="p-4 border border-gray-200">
                        {student.name}
                      </td>
                      <td className="p-4 border border-gray-200">
                        {student.attendancePercentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminSidebar>
  );
};

export default CourseStudents;
