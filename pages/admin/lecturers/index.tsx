import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/adminsidebar';

const LecturersList = () => {
  const router = useRouter();

  // Sample data for lecturers (you would typically fetch this from an API)
  const [lecturers, setLecturers] = useState([
    { id: 1, name: 'Dr. John Doe', email: 'john.doe@example.com', phone: '123-456-7890', department: 'Mathematics' },
    { id: 2, name: 'Prof. Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', department: 'Physics' },
    { id: 3, name: 'Dr. Alice Brown', email: 'alice.brown@example.com', phone: '456-789-0123', department: 'Chemistry' },
  ]);

  // State for adding a new lecturer
  const [newLecturer, setNewLecturer] = useState({
    name: '',
    email: '',
    phone: '',
    department: ''
  });

  const handleRowClick = (lecturerId) => {
    router.push(`/admin/lecturers/${lecturerId}`); // Navigate to classes page for selected lecturer
  };

  const handleInputChange = (e) => {
    setNewLecturer({
      ...newLecturer,
      [e.target.name]: e.target.value
    });
  };

  const handleAddLecturer = () => {
    // Add a new lecturer (In a real scenario, you would send this data to the backend)
    const id = lecturers.length + 1;
    setLecturers([...lecturers, { ...newLecturer, id }]);
    setNewLecturer({ name: '', email: '', phone: '', department: '' });
  };

  return (
    <AdminSidebar>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Lecturers List</h1>

      {/* Table displaying lecturers */}
      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="p-4 border border-gray-200">Name</th>
              <th className="p-4 border border-gray-200">Email</th>
              <th className="p-4 border border-gray-200">Phone</th>
              <th className="p-4 border border-gray-200">Department</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer) => (
              <tr
                key={lecturer.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(lecturer.id)}
              >
                <td className="p-4 border border-gray-200">{lecturer.name}</td>
                <td className="p-4 border border-gray-200">{lecturer.email}</td>
                <td className="p-4 border border-gray-200">{lecturer.phone}</td>
                <td className="p-4 border border-gray-200">{lecturer.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form to add a new lecturer */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add New Lecturer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newLecturer.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            value={newLecturer.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            value={newLecturer.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="department"
            value={newLecturer.department}
            onChange={handleInputChange}
            placeholder="Department"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleAddLecturer}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Lecturer
        </button>
      </div>
    </div>
    </AdminSidebar>
  );
};

export default LecturersList;
