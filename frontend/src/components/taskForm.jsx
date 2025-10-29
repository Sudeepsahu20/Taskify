import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, dueDate);
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new task..."
        className="border rounded-lg px-4 py-2 w-64 outline-none text-black"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border rounded-lg px-4 py-2 outline-none text-black"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
