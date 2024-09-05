import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Barcode from "react-barcode"; // Import Barcode component
import { FaTimes } from "react-icons/fa"; // Import icon for ending session

const ClassDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get class ID from the URL

  // Initial class and student data (replace with actual fetching logic)
  const [classData, setClassData] = useState({
    id: 1,
    name: "Computer Science 101",
    students: [
      { id: 1, name: "John Doe", attendance: false },
      { id: 2, name: "Jane Smith", attendance: false },
      { id: 3, name: "Tom Johnson", attendance: false },
    ],
  });

  const [sessionActive, setSessionActive] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState("");

  useEffect(() => {
    // Fetch the class data including students and class name using the `id`
    // Replace this with actual fetching logic based on `id`.
  }, [id]);

  // Toggle attendance for a student
  const handleAttendanceToggle = (studentId) => {
    const updatedStudents = classData.students.map((student) =>
      student.id === studentId
        ? { ...student, attendance: !student.attendance }
        : student
    );
    setClassData({ ...classData, students: updatedStudents });
  };

  // Start the session and generate barcode
  const handleStartSession = () => {
    setSessionActive(true);
    setBarcodeValue(`class-${Date.now()}`); // Generate unique barcode value
  };

  // End the session and process attendance
  const handleEndSession = () => {
    setSessionActive(false);
    setBarcodeValue(""); // Clear the barcode
    const attendedStudents = classData.students.filter(
      (student) => student.attendance
    );
    alert(`Session ended. ${attendedStudents.length} students marked present.`);
  };

  return (
    <Sidebar>
      <div className="p-4 md:p-8">
        {/* Class Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{classData.name}</h2>
        
        {/* Session Controls */}
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

        {/* Barcode Display */}
        {sessionActive && barcodeValue && (
          <div className="mt-4 bg-white p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Current Session Barcode
            </h3>
            <Barcode value={barcodeValue} />
            <button
              className="mt-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
              onClick={handleEndSession}
            >
              <FaTimes className="inline mr-2" />
              End Session
            </button>
          </div>
        )}

        {/* Student List with Attendance */}
        {sessionActive && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Mark Attendance
            </h3>
            <ul className="bg-white p-4 rounded shadow-lg">
              {classData.students.map((student) => (
                <li
                  key={student.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <span>{student.name}</span>
                  <input
                    type="checkbox"
                    checked={student.attendance}
                    onChange={() => handleAttendanceToggle(student.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show students if session is not active */}
        {!sessionActive && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Students in Class
            </h3>
            <ul className="bg-white p-4 rounded shadow-lg">
              {classData.students.map((student) => (
                <li
                  key={student.id}
                  className="flex justify-between items-center p-2 border-b"
                >
                  {student.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default ClassDetail;
