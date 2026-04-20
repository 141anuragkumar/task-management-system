import React, { useState, useEffect } from "react";
import { getAllTasks, createTask, updateTask, deleteTask } from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setMsg("Title aur Description dono bharo!"); return;
    }
    try {
      const newTask = await createTask({ title, description });
      setTasks([newTask, ...tasks]);
      setTitle(""); setDescription("");
      setMsg("Task added!");
    } catch (error) { setMsg("Error adding task!"); }
    setTimeout(() => setMsg(""), 2000);
  };

  const handleStatus = async (id, status) => {
    try {
      const updated = await updateTask(id, { status });
      setTasks(tasks.map(t => t._id === id ? updated : t));
    } catch (error) { console.error("Update error:", error); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete karna hai?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) { console.error("Delete error:", error); }
  };

  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter);
  const pending = tasks.filter(t => t.status === "Pending").length;
  const completed = tasks.filter(t => t.status === "Completed").length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Stats */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 flex-1 text-center shadow-sm">
          <div className="text-2xl font-bold dark:text-white">{tasks.length}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/30 border dark:border-amber-800 rounded-xl p-4 flex-1 text-center shadow-sm">
          <div className="text-2xl font-bold text-amber-500">{pending}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 border dark:border-green-800 rounded-xl p-4 flex-1 text-center shadow-sm">
          <div className="text-2xl font-bold text-green-500">{completed}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
        </div>
      </div>

      {/* Add Form */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Add New Task</h2>
        {msg && (
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm px-4 py-2 rounded mb-4">
            {msg}
          </div>
        )}
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border dark:border-gray-600 rounded px-4 py-2 mb-3 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border dark:border-gray-600 rounded px-4 py-2 mb-4 bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 outline-none focus:border-blue-500 resize-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition">
            + Add Task
          </button>
        </form>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">Total: {tasks.length} tasks</span>
        <div className="flex gap-2">
          {["All", "Pending", "Completed"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded text-sm transition ${
                filter === f
                  ? "bg-gray-800 dark:bg-white text-white dark:text-gray-900"
                  : "border dark:border-gray-600 dark:text-gray-300 hover:border-gray-400"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center py-10 dark:text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 dark:text-gray-400">No tasks found</div>
      ) : (
        filtered.map((task) => (
          <div key={task._id}
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 mb-3 shadow-sm transition-colors duration-200">
            <h3 className={`font-semibold dark:text-white ${task.status === "Completed" ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                task.status === "Completed"
                  ? "bg-green-100 dark:bg-green-900/40 text-green-600"
                  : "bg-amber-100 dark:bg-amber-900/40 text-amber-600"
              }`}>
                {task.status}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatus(task._id, task.status === "Pending" ? "Completed" : "Pending")}
                  className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  Toggle
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-xs bg-red-100 dark:bg-red-900/40 text-red-500 px-3 py-1.5 rounded hover:bg-red-200 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;