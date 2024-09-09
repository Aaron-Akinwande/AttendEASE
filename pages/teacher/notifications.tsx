import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { FaPaperPlane, FaExclamationTriangle, FaBell } from "react-icons/fa";

const NotificationsPage = () => {
  const [notification, setNotification] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleSendNotification = () => {
   
    console.log(`Sending ${messageType} notification: ${notification}`);
    setNotification("");
  };

  return (
    <Sidebar>
      <div className="p-4 sm:p-6  min-h-screen">
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
          >
            <FaPaperPlane className="mr-2" />
            Send Notification
          </button>
        </div>

        
        <div className="mt-6 p-4 bg-white rounded shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Sent Notifications
          </h2>
          <ul className="space-y-4">
      
            <li className="flex items-center p-3 rounded-lg bg-blue-100 border-l-4 border-blue-500">
              <FaBell className="text-blue-500 mr-3" size={24} />
              <div className="flex-grow text-gray-700">
                Information: Upcoming quiz in Biology 105
              </div>
            </li>
            <li className="flex items-center p-3 rounded-lg bg-red-100 border-l-4 border-red-500">
              <FaExclamationTriangle className="text-red-500 mr-3" size={24} />
              <div className="flex-grow text-gray-700">
                Alert: Attendance below 75% in Physics 102
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Sidebar>
  );
};

export default NotificationsPage;
