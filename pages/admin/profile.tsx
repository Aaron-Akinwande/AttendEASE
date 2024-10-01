import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminSidebar from "@/components/adminsidebar";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios"; // Assuming axios is used for HTTP requests
import { queryKeys } from "@/api/queryKey";
import { getRequest, patchRequest } from "@/api/apiCall";
import { ADMIN } from "@/api/apiURL";

const ProfilePage = () => {
  const uid: any =
    typeof window !== "undefined" && localStorage.getItem("admin_token");
  const queryClient = useQueryClient();

 
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.getAdmin, uid],
    queryFn: async () => await getRequest({ url: ADMIN(uid) }),
    enabled: !!uid,
  });

  const { mutate: editAdmin, isPending } = useMutation({
    mutationFn: async (edit: any) => {
      await patchRequest({ url: ADMIN(uid), data: edit });
    },
    onSuccess: () => {
      console.log("Admin Editted");
      setEditing(false);
      queryClient.refetchQueries({ queryKey: [queryKeys.getAdmin] });
    },
    onError: (error) => {
      console.error("Error editing admin:", error);
    },
  });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    if (profileData) {
      setProfile({
        name: profileData.fullName,
        email: profileData.email,
        phone: profileData.phoneNumber,
        password: profile.password, 
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedProfile = {
      fullName: profile.name,
      email: profile.email,
      phoneNumber: profile.phone,
      password: profile.password ? profile.password : undefined, 
    };

    editAdmin(updatedProfile);
  };

  // if (isLoading) {
  //   return (
  //     <AdminSidebar>
  //       <div className="p-6 min-h-screen">Loading...</div>
  //     </AdminSidebar>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <AdminSidebar>
  //       <div className="p-6 min-h-screen">Error loading profile.</div>
  //     </AdminSidebar>
  //   );
  // }

  return (
    <AdminSidebar>
      <div className="p-4 sm:p-6 min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Profile
        </h1>

        <div className="p-4 bg-white rounded shadow-lg max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>
          <form>
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

            {editing && (
              <div className="mb-4  flex flex-col w-full ">
                  <label className="block text-gray-700 font-semibold mb-2">
                    <FaLock className="inline mr-2" /> Password
                  </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white"
                  />
                <button
                  type="button"
                  className=" p-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              {editing ? (
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                  onClick={handleSave}
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save"}
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
    </AdminSidebar>
  );
};

export default ProfilePage;
