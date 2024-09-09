import Sidebar from '@/components/sidebar';
import React, { useState } from 'react';
import { FaBarcode, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AttendanceManagement = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: 'John Doe', status: 'Present' },
    { id: 2, name: 'Jane Smith', status: 'Absent' },
   
  ]);

  const handleScan = () => {
    if (scannedBarcode.trim() === '') {
      alert('Please enter a barcode');
      return;
    }

   
    const updatedList = attendanceList.map((student) =>
      student.id.toString() === scannedBarcode
        ? { ...student, status: 'Present' }
        : student
    );

    setAttendanceList(updatedList);
    setScannedBarcode('');
  };

  const handleManualMark = (id, status) => {
    const updatedList = attendanceList.map((student) =>
      student.id === id ? { ...student, status } : student
    );
    setAttendanceList(updatedList);
  };

  return (
    <Sidebar>
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Management</h2>

    
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Scan Barcode</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full md:w-64"
            placeholder="Enter barcode"
            value={scannedBarcode}
            onChange={(e) => setScannedBarcode(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleScan}
          >
            <FaBarcode className="inline mr-2" /> Scan
          </button>
        </div>
      </div>

     
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Attendance List</h3>
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
              <th className="py-3 px-4 text-left">Student ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((student) => (
              <tr key={student.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.status}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => handleManualMark(student.id, 'Present')}
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleManualMark(student.id, 'Absent')}
                  >
                    <FaTimesCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Sidebar>
  );
};

export default AttendanceManagement;
