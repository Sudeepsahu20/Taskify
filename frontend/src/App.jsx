import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/taskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const addTask = async (title, dueDate) => {
    await axios.post("http://localhost:5000/api/tasks", { title, dueDate });
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const updateTask = async (id, title) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { title });
    fetchTasks();
  };

  const markAllCompleted = async () => {
    await Promise.all(
      tasks.map((task) =>
        axios.put(`http://localhost:5000/api/tasks/${task._id}`, { completed: true })
      )
    );
    fetchTasks();
  };


  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      
      <h1
        className={`text-3xl font-bold mb-6 ${
          darkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        📝 Taskify - Smart To-Do App
      </h1>

      
      <div className="flex gap-3 mb-5">
        <button
          onClick={markAllCompleted}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Mark All Completed
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg transition-all ${
            darkMode
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`border rounded-lg px-4 py-2 mb-4 w-64 outline-none transition-all ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
        }`}
      />

    
      <TaskForm addTask={addTask} darkMode={darkMode} />

     
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        updateTask={updateTask}
        darkMode={darkMode}
      />
    </div>
  );
};

export default App;
