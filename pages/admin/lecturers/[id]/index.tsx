import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminSidebar from '@/components/adminsidebar';
import { getRequest, patchRequest, postRequest } from '@/api/apiCall'; // Function to make GET requests
import { GET_COURSES, LECTURER } from '@/api/apiURL'; // API endpoint for fetching a single lecturer
import { queryKeys } from '@/api/queryKey';

const LecturerClasses = () => {

  // Not et aaron: assign course function is not complete
  const router = useRouter();
  const queryClient = useQueryClient(); 

  const { id } = router.query;

  
  const uid: any =
    typeof window !== "undefined" && localStorage.getItem("admin_token");

  
  const { data: lecturerData, isLoading, isError } = useQuery({

    queryKey: [queryKeys.getLecturer, uid, id], 
    queryFn: async () => await getRequest({ url: LECTURER( uid, id) }),
    
      enabled: !!id, 
    }
  );

  const [lecturer, setLecturer] = useState({ coursesTaught: [] });

  useEffect(() => {
    if (lecturerData) {
      setLecturer(lecturerData); 
    }
    console.log(lecturerData)
  }, [lecturerData]);

  const [availableCourses, setAvailableCourses] = useState([]); 
  const [selectedCourseId, setSelectedCourseId] = useState(''); 

  
  const { data: courseData, isLoading: courseFetching } = useQuery({

    queryKey: [queryKeys.getCourses, uid], 
    queryFn: async () => await getRequest({ url: GET_COURSES( uid ) }),
      enabled: !!uid, 
    }
  );

  const { mutate: editLecturer } = useMutation({
    mutationFn: async (newLect: any) => {
      await patchRequest({ url: LECTURER(uid,id), data: newLect });
    },
    onSuccess: (data) => {
      console.log("Lecturer Editted and Course Assigned" );
      queryClient.refetchQueries({ queryKey: [queryKeys.getLecturer] })
    },
    onError: (error) => {
      console.error("Error adding lecturer:", error);
    },
  });

  useEffect(() => {
    if (courseData) {
      setAvailableCourses(courseData);
    }
    console.log(courseData)
  }, [courseData]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value); 
  };

  const handleAssignCourse = () => {
    const selectedCourse = availableCourses.find(
      (course) => course.courseId === parseInt(selectedCourseId)
    );
    if (selectedCourse) {
      setLecturer((prevData) => ({
        ...prevData,
        coursesTaught: [...prevData.coursesTaught, selectedCourse],
      }));
      setSelectedCourseId(''); 
    }
  };
  
 
  useEffect(() => {
    if (availableCourses.length > 0) {
      editLecturer(lecturer);
    }
    console.log(lecturer)
  }, [lecturer]);

  



  
  if (isLoading) {
    return <AdminSidebar>Loading lecturer data...</AdminSidebar>;
  }

  if (isError || !lecturerData) {
    return <AdminSidebar>Error fetching lecturer data</AdminSidebar>;
  }

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">{lecturerData.fullName}'s Classes</h1>
        <div className="overflow-x-auto shadow-lg">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="p-4 border border-gray-200">Course Name</th>
                <th className="p-4 border border-gray-200">Total Students</th>
                <th className="p-4 border border-gray-200">Sessions Undertaken</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && lecturerData.coursesTaught.map((course) => (
                <tr key={course.courseId} className="hover:bg-gray-100">
                  <td className="p-4 border border-gray-200">{course.courseName}</td>
                  <td className="p-4 border border-gray-200">{course.students.length}</td>
                  <td className="p-4 border border-gray-200">{course.totalSessions}</td>
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
              {!courseFetching && availableCourses.length > 0  && availableCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
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
    </AdminSidebar>
  );
};

export default LecturerClasses;
