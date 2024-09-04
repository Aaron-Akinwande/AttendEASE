import StudentSidebar from "@/components/studentsidebar";
import React, { useState } from "react";

const ProfilePage = () => {
  // Sample state for demonstration purposes
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });

  const [editMode, setEditMode] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  // Function to handle form submission (e.g., updating profile)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle form submission, e.g., sending data to an API
    console.log("Profile updated:", studentInfo);
    setEditMode(false);
  };

  return (
    <StudentSidebar>
      <div className="p-4 sm:p-6 bg-blue-200 rounded-lg min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Your Profile
        </h1>

        {/* Profile Information Section */}
        <div className="p-4 bg-white rounded shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={studentInfo.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !editMode && "bg-gray-200"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={studentInfo.email}
                onChange={handleChange}
                disabled={!editMode}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !editMode && "bg-gray-200"
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={studentInfo.phone}
                onChange={handleChange}
                disabled={!editMode}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !editMode && "bg-gray-200"
                }`}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </StudentSidebar>
  );
};

export default ProfilePage;
