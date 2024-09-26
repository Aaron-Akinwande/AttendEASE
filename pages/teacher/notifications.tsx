import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPaperPlane, FaExclamationTriangle, FaBell } from "react-icons/fa";
import { getRequest, postRequest } from "@/api/apiCall";
import { NOTIFICATIONS } from "@/api/apiURL";
import { queryKeys } from "@/api/queryKey";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const uid = typeof window !== "undefined" && localStorage.getItem("admin_token");

  const [notification, setNotification] = useState("");
  const [messageType, setMessageType] = useState("info");

  // Fetch notifications using react-query
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.getNotifications, uid],
    queryFn: async () => await getRequest({ url: NOTIFICATIONS(uid) }),
    enabled: !!uid,
  });

  // Mutation for sending new notification
  const { mutate: sendNotification, isPending } = useMutation({
    mutationFn: async (newNotification) => {
      await postRequest({ url: NOTIFICATIONS(uid), data: newNotification });
    },
    onSuccess: () => {
      setNotification(""); // Clear input
      queryClient.invalidateQueries({ queryKey: [queryKeys.getNotifications, uid] }); // Refresh notifications list
    },
    onError: (error) => {
      console.error("Error sending notification:", error);
    },
  });

  const handleSendNotification = () => {
    if (notification.trim()) {
      const newNotification = {
        adminId: uid,
        message: notification,
        type: messageType,
      };
      sendNotification(newNotification);
    }
  };

  if (isLoading) {
    return (
      <Sidebar>
        <div className="p-6 min-h-screen">Loading...</div>
      </Sidebar>
    );
  }

  if (isError) {
    return (
      <Sidebar>
        <div className="p-6 min-h-screen">Error loading notifications.</div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="p-4 sm:p-6 min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Send Notifications
        </h1>

        <div className="p-4 bg-white rounded shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Create a Notification
          </h2>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Enter your notification message..."
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Notification Type:
            </label>
            <select
              className="w-full p-2 border rounded"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
            >
              <option value="info">Information</option>
              <option value="alert">Alert</option>
              <option value="warning">Warning</option>
            </select>
          </div>
          <button
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleSendNotification}
            disabled={isPending}
          >
            <FaPaperPlane className="mr-2" />
            {isPending ? "Sending..." : "Send Notification"}
          </button>
        </div>

        <div className="mt-6 p-4 bg-white rounded shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Sent Notifications
          </h2>
          <ul className="space-y-4">
            {notifications &&
              notifications.map((notif, index) => (
                <li
                  key={index}
                  className={`flex items-center p-3 rounded-lg ${
                    notif.type === "alert"
                      ? "bg-red-100 border-red-500"
                      : notif.type === "warning"
                      ? "bg-yellow-100 border-yellow-500"
                      : "bg-blue-100 border-blue-500"
                  } border-l-4`}
                >
                  {notif.type === "alert" ? (
                    <FaExclamationTriangle className="text-red-500 mr-3" size={24} />
                  ) : (
                    <FaBell
                      className={`${
                        notif.type === "info" ? "text-blue-500" : "text-yellow-500"
                      } mr-3`}
                      size={24}
                    />
                  )}
                  <div className="flex-grow text-gray-700">
                    {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}:{" "}
                    {notif.message}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Sidebar>
  );
};

export default NotificationsPage;
