import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Barcode from "react-barcode"; 
import { FaTimes } from "react-icons/fa"; 

const ClassDetail = () => {
  const router = useRouter();
  const { id } = router.query; 

  // Initial class and student data (replace with actual fetching logic)
  const [classData, setClassData] = useState({
    id: 1,
    name: "Computer Science 101",
    totalSessions: 5, 
    students: [
      { id: 1, name: "John Doe", attendance: false, attendedSessions: 4 },
      { id: 2, name: "Jane Smith", attendance: false, attendedSessions: 5 },
      { id: 3, name: "Tom Johnson", attendance: false, attendedSessions: 3 },
    ],
  });

  const [sessionActive, setSessionActive] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    // Fetch the class data including students and class name using the `id`
    // Replace this with actual fetching logic based on `id`.
  }, [id]);

  const filteredStudents = classData.students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAttendanceToggle = (studentId) => {
    const updatedStudents = classData.students.map((student) =>
      student.id === studentId
        ? { ...student, attendance: !student.attendance }
        : student
    );
    setClassData({ ...classData, students: updatedStudents });
  };

  const handleStartSession = () => {
    setSessionActive(true);
    setBarcodeValue(`class-${Date.now()}`); 
  };
  const handleEndSession = () => {
    const attendedStudents = classData.students.filter(
      (student) => student.attendance
    );

    const updatedTotalSessions = classData.totalSessions + 1;

    const updatedStudents = classData.students.map((student) => {
      if (student.attendance) {
        return { ...student, attendedSessions: student.attendedSessions + 1 };
      }
      return student;
    });

    setClassData({
      ...classData,
      totalSessions: updatedTotalSessions,
      students: updatedStudents,
    });

    setSessionActive(false);

    alert(`Session ended. ${attendedStudents.length} students marked present.`);
  };

  const getAttendancePercentage = (attendedSessions) => {
    return classData.totalSessions > 0
      ? Math.round((attendedSessions / classData.totalSessions) * 100)
      : 0;
  };

  return (
    <Sidebar>
      <div className="p-4 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {classData.name}
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {!sessionActive ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md mb-4"
            onClick={handleStartSession}
          >
            Start Session
          </button>
        ) : (
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md mb-4"
            onClick={handleEndSession}
          >
            End Session
          </button>
        )}

        {sessionActive && barcodeValue && (
          <div className="mt-4 bg-white p-4 rounded shadow-lg w-full">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Current Session Barcode
            </h3>
            <div className=" w-full flex justify-center items-center">
              <Barcode value={barcodeValue} />
            </div>
            <button
              className="mt-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
              onClick={handleEndSession}
            >
              <FaTimes className="inline mr-2" />
              End Session
            </button>
          </div>
        )}

        {sessionActive && (
          <div className=" pt-5">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Mark Attendance
            </h3>
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
                  <th className="py-3 px-4 text-left">Student ID</th>
                  <th className="py-3 px-4 text-left">Student Name</th>
                  <th className="py-3 px-4 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-200">
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={student.attendance}
                        onChange={() => handleAttendanceToggle(student.id)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!sessionActive && (
          <div className=" pt-2">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Students in Class
            </h3>
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
                  <th className="py-3 px-4 text-left">Student ID</th>
                  <th className="py-3 px-4 text-left">Student Name</th>
                  <th className="py-3 px-4 text-center">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-200">
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      {getAttendancePercentage(student.attendedSessions)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default ClassDetail;
