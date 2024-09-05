import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router"; // Import Next.js router

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "Computer Science 101", students: 30 },
    { id: 2, name: "Mathematics 201", students: 25 },
  ]);
  const [newClassName, setNewClassName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  const router = useRouter();

  const handleAddClass = () => {
    if (newClassName.trim() === "") {
      alert("Please enter a class name");
      return;
    }

    const newClass = {
      id: classes.length + 1,
      name: newClassName,
      students: 0,
    };

    setClasses([...classes, newClass]);
    setNewClassName("");
  };

  const handleEditClass = (classItem) => {
    setEditMode(true);
    setCurrentClass(classItem);
    setNewClassName(classItem.name);
  };

  const handleUpdateClass = () => {
    if (newClassName.trim() === "") {
      alert("Please enter a class name");
      return;
    }

    const updatedClasses = classes.map((classItem) =>
      classItem.id === currentClass.id
        ? { ...classItem, name: newClassName }
        : classItem
    );

    setClasses(updatedClasses);
    setEditMode(false);
    setCurrentClass(null);
    setNewClassName("");
  };

  const handleDeleteClass = (id) => {
    const filteredClasses = classes.filter((classItem) => classItem.id !== id);
    setClasses(filteredClasses);
  };

  const navigateToClassDetail = (classId) => {
    router.push(`/teacher/classes/${classId}`); // Navigate to the class detail page
  };

  return (
    <Sidebar>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Class Management
        </h2>

        {/* Add/Edit Class Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {editMode ? "Edit Class" : "Add New Class"}
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full md:w-64"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <button
              className={`${
                editMode
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white p-2 rounded-md transition-colors`}
              onClick={editMode ? handleUpdateClass : handleAddClass}
            >
              {editMode ? (
                <FaEdit className="inline mr-2" />
              ) : (
                <FaPlus className="inline mr-2" />
              )}
              {editMode ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* Classes List */}
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
                  onClick={() => navigateToClassDetail(clsItem.id)} // Navigate to class detail on click
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
