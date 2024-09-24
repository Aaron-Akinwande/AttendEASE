import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "Computer Science 101", students: 30 },
    { id: 2, name: "Mathematics 201", students: 25 },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const router = useRouter();

  const handleEditClass = (classItem) => {
    setEditMode(true);
    setCurrentClass(classItem);
  };

  const handleUpdateClass = () => {
    if (!currentClass) {
      return;
    }

    const updatedClasses = classes.map((classItem) =>
      classItem.id === currentClass.id
        ? { ...classItem, name: currentClass.name }
        : classItem
    );

    setClasses(updatedClasses);
    setEditMode(false);
    setCurrentClass(null);
  };

  const handleDeleteClass = (id) => {
    const filteredClasses = classes.filter((classItem) => classItem.id !== id);
    setClasses(filteredClasses);
  };

  const navigateToClassDetail = (classId) => {
    router.push(`/teacher/classes/${classId}`);
  };

  return (
    <Sidebar>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Class Management
        </h2>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Classes List
          </h3>
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm uppercase">
                <th className="py-3 px-4 text-left">Class ID</th>
                <th className="py-3 px-4 text-left">Class Name</th>
                <th className="py-3 px-4 text-left">Students</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((clsItem) => (
                <tr
                  key={clsItem.id}
                  className="border-b border-gray-200 cursor-pointer"
                  onClick={() => navigateToClassDetail(clsItem.id)}
                >
                  <td className="py-3 px-4">{clsItem.id}</td>
                  <td className="py-3 px-4">{clsItem.name}</td>
                  <td className="py-3 px-4">{clsItem.students}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClass(clsItem);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClass(clsItem.id);
                      }}
                    >
                      <FaTrash />
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

export default ClassManagement;
