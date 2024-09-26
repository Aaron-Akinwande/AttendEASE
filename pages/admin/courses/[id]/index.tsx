import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/adminsidebar';
import { queryKeys } from '@/api/queryKey';
import { getRequest } from '@/api/apiCall';
import { GET_COURSE } from '@/api/apiURL';
import { useQuery } from '@tanstack/react-query';

const CourseStudents = () => {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const uid: any =
  typeof window !== "undefined" && localStorage.getItem("admin_token");

  // Fetch courses from the API
  const { data: courseData, isLoading: coursesLoading, isError: coursesError } = useQuery({
    queryKey: [queryKeys.getcourse, uid, id], 
    queryFn: async () => await getRequest({ url: GET_COURSE(uid,id) }),
    
      enabled: !!id, 
  })

  useEffect(() => {
    
      setCourse(courseData);
      setStudents(courseData?.students);
    
  }, [courseData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students?.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        {course && (
          <div>
            <h1 className="text-2xl font-bold mb-6">
              Students in {course.courseName}
            </h1>
            <h2 className="text-lg mb-4">Lecturer: {course.courseLecturer}</h2>

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
                  {filteredStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="p-4 border border-gray-200">
                        {student.name}
                      </td>
                      <td className="p-4 border border-gray-200">
                        {(student.attendedSessions/course.totalSessions) * 100}%
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
