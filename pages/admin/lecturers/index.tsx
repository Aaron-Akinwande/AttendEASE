import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminSidebar from "@/components/adminsidebar";
import { getRequest, postRequest } from "@/api/apiCall"; // Importing the postRequest function
import { LECTURERS } from "@/api/apiURL"; // The endpoint to fetch and post lecturers
import { queryKeys } from "@/api/queryKey"; // Query keys for React Query caching

// Updated Lecturer interface with firstName and lastName
interface Lecturer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
}

const LecturersList = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); 

  const uid: any =
    typeof window !== "undefined" && localStorage.getItem("admin_token");

  // Fetching the list of lecturers from the API using React Query
  const {
    data: lecturersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.getLecturers, uid], // Unique key for caching the lecturers query
    queryFn: async () => await getRequest({ url: LECTURERS(uid) }), // API call to fetch lecturers
  });

  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    if (lecturersData) {
      setLecturers(lecturersData); // Update the lecturers state when data is fetched
    }
  }, [lecturersData]);

  // State for adding a new lecturer
  const [newLecturer, setNewLecturer] = useState<Lecturer>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
  });

  // Mutation for adding a new lecturer
  const { mutate: addLecturer, isPending: isAdding } = useMutation({
    mutationFn: async (newLect: Lecturer) => {
      await postRequest({ url: LECTURERS(uid), data: newLect });
    },
    onSuccess: (data) => {
      // console.log("Lecturer Added:" + data);

      setNewLecturer({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        department: "",
      });

      queryClient.refetchQueries({ queryKey: [queryKeys.getLecturers] })
    },
    onError: (error) => {
      console.error("Error adding lecturer:", error);
    },
  });

  const handleRowClick = (lecturerId) => {
    router.push(`/admin/lecturers/${lecturerId}`); // Navigate to classes page for selected lecturer
  };

  const handleInputChange = (e) => {
    setNewLecturer({
      ...newLecturer,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddLecturer = () => {
    addLecturer(newLecturer); 
  };

  if (isLoading) {
    return <AdminSidebar>Loading lecturers...</AdminSidebar>;
  }

  if (isError) {
    return <AdminSidebar>Error fetching lecturers</AdminSidebar>;
  }

  return (
    <AdminSidebar>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Lecturers List</h1>

        {/* Table displaying lecturers */}
        <div className="overflow-x-auto shadow-lg">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="p-4 border border-gray-200">First Name</th>
                <th className="p-4 border border-gray-200">Last Name</th>
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
                  <td className="p-4 border border-gray-200">
                    {lecturer.firstName}
                  </td>
                  <td className="p-4 border border-gray-200">
                    {lecturer.lastName}
                  </td>
                  <td className="p-4 border border-gray-200">
                    {lecturer.email}
                  </td>
                  <td className="p-4 border border-gray-200">
                    {lecturer.phoneNumber}
                  </td>
                  <td className="p-4 border border-gray-200">
                    {lecturer.department}
                  </td>
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
              name="firstName"
              value={newLecturer.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={newLecturer.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
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
              name="phoneNumber"
              value={newLecturer.phoneNumber}
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
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add Lecturer"}
          </button>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default LecturersList;
