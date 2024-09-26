import Sidebar from "@/components/sidebar";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/api/apiCall";
import { LECTURER } from "@/api/apiURL";
import { queryKeys } from "@/api/queryKey";
import { useRouter } from "next/router";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const uid = typeof window !== "undefined" && localStorage.getItem("admin_token");
  const id = typeof window !== "undefined" && localStorage.getItem("lect_token");


  const { data: lecturerData, isSuccess } = useQuery({
    queryKey: [queryKeys.getLecturer, uid,id],
    queryFn: async () => await getRequest({ url: LECTURER(uid,id) }),
    enabled: !!uid, 
  });

  useEffect(() => {
    if (isSuccess && lecturerData) {
      setCourses(lecturerData.coursesTaught || []);
    }
  }, [lecturerData, isSuccess]);

  const navigateToClassDetail = (courseId) => {
    router.push(`/teacher/courses/${courseId}`);
  };

  return (
    <Sidebar>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Management</h2>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Courses List</h3>
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
                <th className="py-3 px-4 text-left">Course ID</th>
                <th className="py-3 px-4 text-left">Course Name</th>
                <th className="py-3 px-4 text-left">Students</th>
                <th className="py-3 px-4 text-center">Total Sessions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.courseId}
                  className="border-b border-gray-200 cursor-pointer"
                  onClick={() => navigateToClassDetail(course.courseId)}
                >
                  <td className="py-3 px-4">{course.courseId}</td>
                  <td className="py-3 px-4">{course.courseName}</td>
                  <td className="py-3 px-4">{course.students.length}</td>
                  <td className="py-3 px-4 text-center">{course.totalSessions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
};

export default CourseManagement;
