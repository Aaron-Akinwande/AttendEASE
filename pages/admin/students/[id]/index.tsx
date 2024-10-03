import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminSidebar from "@/components/adminsidebar";
import { getRequest, patchRequest } from "@/api/apiCall"; // Assume these are defined in your apiCall file
import { STUDENT, GET_COURSES, GET_COURSE } from "@/api/apiURL"; // Add appropriate API URLs
import { queryKeys } from "@/api/queryKey"; // Adjust this according to your query key definitions

const StudentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const uid = typeof window !== "undefined" && localStorage.getItem("admin_token");

  const queryClient = useQueryClient();

  const [student, setStudent] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [editing, setEditing] = useState(false);

  // Fetch student data
  const { data: studentData, isLoading: loadingStudent } = useQuery({
    queryKey: [queryKeys.getstudent, uid, id],
    queryFn: () => getRequest({ url: STUDENT(uid, id) }),
    enabled: !!id,
  });

  // Fetch available courses
  const { data: courseData } = useQuery({
    queryKey: [queryKeys.getCourses],
    queryFn: () => getRequest({ url: GET_COURSES(uid) }),
  });

  const { mutate: editStudent } = useMutation({
    mutationFn: async (updatedStudent) => {
      await patchRequest({ url: STUDENT(uid, id), data: updatedStudent });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getstudent] });
      setEditing(false);
    },
  });

  // const { mutate: assignCourse } = useMutation({
  //   mutationFn: async (newCourse) => {
  //     // Add the new course to the student's list of courses
  //     const updatedCourses = [...assignedCourses, newCourse];
  //     await patchRequest({
  //       url: STUDENT(uid, id),
  //       data: { courses: updatedCourses },
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [queryKeys.getstudent, uid, id] });
  //   },
  // });

  const { mutate: assignCourse } = useMutation({
    mutationFn: async (newCourse: any) => {
      const updatedCourses = [...assignedCourses, newCourse];
      

      await patchRequest({
        url: STUDENT(uid, id),
        data: { courses: updatedCourses },
      });
  

      const course = await getRequest({ url:GET_COURSE(uid, newCourse.courseId) });
  
      // 4. Add the student to the list of students in the course
      const updatedStudents = [...course.students, {
        id: student.id, 
        name: student.firstName + student.lastName,
        attendedSessions: 0, 
      }];
  
      // 5. Update the course's student list in the database
      await patchRequest({
        url: `${GET_COURSES(uid)}/${newCourse.courseId}`,
        data: { students: updatedStudents },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getstudent, uid, id] });
    },
  });
  

  useEffect(() => {
    if (studentData) {
      setStudent(studentData);
      setAssignedCourses(studentData.courses || []);
    }
  }, [studentData]);

  useEffect(() => {
    if (courseData) {
      setAvailableCourses(courseData);
    }
  }, [courseData]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const handleAddCourse = () => {
    const selectedCourse = availableCourses.find(
      (course) => course.courseId === parseInt(selectedCourseId)
    );
    if (selectedCourse) {
      // Trigger the mutation to assign the course to the student
      assignCourse({ ...selectedCourse, attendancePercentage: "0%" });
      setSelectedCourseId("");
    }
  };

  const handleEditStudent = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveStudent = () => {
    editStudent(student);
  };

  if (loadingStudent) {
    return <AdminSidebar>Loading student data...</AdminSidebar>;
  }

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
                  <label className="mb-2 font-medium">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={student.firstName}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-2 font-medium">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={student.lastName}
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
                  <label className="mb-2 font-medium">Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={student.phoneNumber}
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
                <h2 className="text-xl font-semibold mb-4">Student Information</h2>
                <div className="mb-4">
                  <strong>First Name:</strong> {student.firstName}
                </div>
                <div className="mb-4">
                  <strong>Last Name:</strong> {student.lastName}
                </div>
                <div className="mb-4">
                  <strong>Email:</strong> {student.email}
                </div>
                <div className="mb-4">
                  <strong>Phone Number:</strong> {student.phoneNumber}
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
                <select
                  value={selectedCourseId}
                  onChange={handleCourseChange}
                  className="p-2 border border-gray-300 rounded flex-grow"
                >
                  <option value="">Select a Course</option>
                  {availableCourses.map((course) => (
                    <option key={course.courseId} value={course.courseId}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddCourse}
                  className="bg-green-500 text-white px-4 py-2 rounded ml-4"
                >
                  Assign Course
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="p-4 border border-gray-200">Course Name</th>
                      <th className="p-4 border border-gray-200">Attendance Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-100">
                        <td className="p-4 border border-gray-200">{course.courseName}</td>
                        <td className="p-4 border border-gray-200">{course.attendancePercentage}</td>
                      </tr>
                    ))}
                    {assignedCourses.length === 0 && (
                      <tr>
                        <td className="p-4 text-center text-gray-500">
                          No courses assigned
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
