import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminSidebar from '@/components/adminsidebar';
import { getRequest, postRequest } from '@/api/apiCall';
import { GET_COURSES, LECTURERS } from '@/api/apiURL'; // Define your API endpoints here
import { queryKeys } from '@/api/queryKey';

const CoursesList = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); 

  const uid: any =
  typeof window !== "undefined" && localStorage.getItem("admin_token");

  const [courses, setcourses] = useState([])

  
  // Fetch courses from the API
  const { data: coursesData, isLoading: coursesLoading, isError: coursesError } = useQuery({
    queryKey: [queryKeys.getCourses, uid], 
    queryFn: async () => await getRequest({ url: GET_COURSES(uid) }),
    
    enabled: !!uid, 
  }
  
);

useEffect(() => {
  if (coursesData) {
    setcourses(coursesData); 
  }
  console.log(coursesData)
}, [coursesData]);

  // Fetch lecturers from the API
  const { data: lecturersData, isLoading: lecturersLoading, isError: lecturersError } = useQuery({
    queryKey: [queryKeys.getLecturers, uid], 
    queryFn: async () => await getRequest({ url: LECTURERS( uid) }),
    
      enabled: !!uid, 
  }  
  );

  // Local state to manage new course input
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    courseLecturer: '',
    totalSessions: ''
  });

  // Mutation to add a new course
  const addCourseMutation = useMutation({
    mutationFn: async (newCourse: any) => {
      await postRequest({ url: GET_COURSES(uid), data: newCourse });
    },
    onSuccess: (data) => {
      console.log("Course Added" );
      queryClient.refetchQueries({ queryKey: [queryKeys.getCourses] })
    },
    onError: (error) => {
      console.error("Error adding lecturer:", error);
    },
  });

  // Handle row click to navigate to course details
  const handleRowClick = (courseId) => {
    router.push(`/admin/courses/${courseId}`);
  };

  // Handle input changes for the new course form
  const handleInputChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value
    });
  };

  // Handle adding a new course
  const handleAddCourse = () => {
    addCourseMutation.mutate(newCourse, {
      onSuccess: () => {
        setNewCourse({ courseName: '', courseLecturer: '', totalSessions: '' });
      }
    });
  };

  if (coursesLoading || lecturersLoading) {
    return <AdminSidebar>Loading data...</AdminSidebar>;
  }

  if (coursesError || lecturersError) {
    return <AdminSidebar>Error fetching data</AdminSidebar>;
  }

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Courses List</h1>

        {/* Display courses */}
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
              {courses?.map((course) => (
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
              {lecturersData?.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.fullName}>
                  {lecturer.fullName}
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
