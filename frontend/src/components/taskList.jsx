import React, { useState } from "react";

const TaskList = ({ tasks, toggleComplete, deleteTask, updateTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const handleUpdate = () => {
    updateTask(editingId, editTitle);
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="w-full max-w-md">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex justify-between items-center bg-white p-3 mb-3 rounded-lg shadow-sm"
        >
          {editingId === task._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border px-2 py-1 rounded w-2/3 text-black"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-3 py-1 rounded-lg"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div
                onClick={() => toggleComplete(task._id, task.completed)}
                className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}{" "}
                {task.dueDate && (
                  <span className="text-sm text-gray-500">
                    (Due: {new Date(task.dueDate).toLocaleDateString()})
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✏
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
