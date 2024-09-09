import StudentSidebar from "@/components/studentsidebar";
import React from "react";
import { useRouter } from "next/router";

const ClassRecordsPage = () => {
  const router = useRouter();

  // Sample class data
  const classes = [
    { 
      id: 1, 
      className: "Mathematics 101", 
      lecturer: "Dr. John Doe", 
      attendancePercentage: 85 
    },
    { 
      id: 2, 
      className: "Physics 202", 
      lecturer: "Prof. Jane Smith", 
      attendancePercentage: 90 
    },
    { 
      id: 3, 
      className: "Chemistry 303", 
      lecturer: "Dr. Alice Brown", 
      attendancePercentage: 75 
    },
    { 
      id: 4, 
      className: "History 404", 
      lecturer: "Prof. Robert Green", 
      attendancePercentage: 92 
    },
  ];

  const handleClassClick = (classId) => {
    // Navigate to the barcode scanner page with the class ID
    router.push(`/student/classes/${classId}`);
  };

  return (
    <StudentSidebar>
      <div className="p-4 sm:p-6 bg-blue-200 min-h-screen rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Class Attendance Records
        </h1>

        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Your Classes and Attendance
          </h2>
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Class Name</th>
                <th className="pb-2">Lecturer</th>
                <th className="pb-2">Attendance Percentage</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem, index) => (
                <tr key={index} className="border-b cursor-pointer" onClick={() => handleClassClick(classItem.id)}>
                  <td className="py-2 ">{classItem.className}</td>
                  <td className="py-2">{classItem.lecturer}</td>
                  <td className="py-2">{classItem.attendancePercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentSidebar>
  );
};

export default ClassRecordsPage;
