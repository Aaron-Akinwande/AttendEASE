import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const ProfilePage = () => {
  // Sample data for demonstration
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    password: "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Logic to save profile information
    console.log("Profile saved:", profile);
    setEditing(false);
  };

  return (
    <Sidebar>
      <div className="p-4 sm:p-6  min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Profile
        </h1>

        <div className="p-4 bg-white rounded shadow-lg max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>
          <form>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaUser className="inline mr-2" /> Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-2 border rounded ${
                  editing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaEnvelope className="inline mr-2" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-2 border rounded ${
                  editing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                <FaPhone className="inline mr-2" /> Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full p-2 border rounded ${
                  editing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Password */}
            {editing && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  <FaLock className="inline mr-2" /> Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end">
              {editing ? (
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              )}
              {editing && (
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Sidebar>
  );
};

export default ProfilePage;
