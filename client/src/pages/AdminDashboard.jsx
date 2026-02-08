import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import KanbanBoard from "../components/kanbanBoard";
import PieChartLive from "../components/PieChartLive";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";


export default function AdminDashboard() {

  /* ================= STATE ================= */
  const [showNotifications, setShowNotifications] = useState(false);
const notificationRef = useRef(null);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    dueThisWeek: 0,
  });
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [notifications, setNotifications] = useState([]);
const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      "http://localhost:5000/api/notifications",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) throw new Error("Failed");

    const data = await res.json();
    setNotifications(data);
  } catch (err) {
    console.error("Notification fetch error:", err);
  }
};


const fetchDashboardData = async () => {
  const token = localStorage.getItem("adminToken");

  const statsRes = await fetch(
    "http://localhost:5000/api/projects/stats",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const statsData = await statsRes.json();
  setStats(statsData);

  const projRes = await fetch(
    "http://localhost:5000/api/projects",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const projData = await projRes.json();
  setProjects(projData);
};

const fetchStatsOnly = async () => {
  const token = localStorage.getItem("adminToken");

  const statsRes = await fetch(
    "http://localhost:5000/api/projects/stats",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const statsData = await statsRes.json();
  setStats(statsData);
};

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) {
      setShowNotifications(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);


useEffect(() => {
  fetchDashboardData();
  fetchNotifications();
}, []);


 /* ================= FETCH DATA ================= */

const filteredProjects = projects.filter((p) => {
  const matchesSearch =
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.projectType.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || p.status === statusFilter;

  return matchesSearch && matchesStatus;
});


const DeadlineList = React.memo(function DeadlineList({ projects }) {

  return (
    <ul className="space-y-3 max-h-[250px] overflow-y-auto pr-2">

      {projects.map((p) => {
        const daysLeft =
          (new Date(p.deadline) - new Date()) /
          (1000 * 60 * 60 * 24);

        let color =
          daysLeft < 2
            ? "bg-red-100 text-red-700"
            : daysLeft < 5
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700";

        return (
          <li
            key={p._id}
            className="flex justify-between p-3 rounded-md bg-gray-50"
          >
            <div>
              <p className="font-medium">{p.projectType}</p>
              <p className="text-sm text-gray-500">{p.name}</p>
            </div>

            <span className={`px-2 py-1 rounded text-xs ${color}`}>
              {new Date(p.deadline).toDateString()}
            </span>
          </li>
        );
      })}
    </ul>
  );
});

  /* ================= HANDLERS ================= */
  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem("adminToken");

    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setProjects((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, status: newStatus } : p
      )
    );
  };
  
const deleteProject = async (id) => {
  const token = localStorage.getItem("adminToken");

  if (!window.confirm("Delete this project permanently?")) return;

  const res = await fetch(
    `http://localhost:5000/api/projects/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    alert("Delete failed");
    return;
  }

  // 🔥 REFETCH PROJECTS FROM DB
  const updated = await fetch(
    "http://localhost:5000/api/projects",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await updated.json();
 fetchDashboardData();

};

return (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 via-yellow-50 to-indigo-100">


    {/* ================= TOP BAR ================= */}
 <header className="bg-gradient-to-r from-purple-600 to-pink-500
                   text-white px-6 py-4 flex justify-between items-center
                   shadow-xl">

  <h1 className="text-2xl font-bold tracking-wide">
    Admin Dashboard
  </h1>

  <div className="flex items-center gap-6">

    {/* 🔔 Notification System */}
    <div ref={notificationRef} className="relative">

      <div
        className="cursor-pointer text-2xl"
        onClick={() =>
          setShowNotifications(!showNotifications)
        }
      >
        🔔

        {notifications.filter(n => !n.read).length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {notifications.filter(n => !n.read).length}
          </span>
        )}
      </div>

    {showNotifications && (
  <div className="absolute right-0 mt-3 w-96 bg-white text-black shadow-2xl rounded-xl max-h-72 overflow-y-auto z-50 border border-gray-200">

    {notifications.length === 0 ? (
      <p className="p-4 text-gray-500 text-center">
        No notifications
      </p>
    ) : (

      notifications.map(n => (
        <div
          key={n._id}
          className={`flex items-start gap-3 p-3 border-b cursor-pointer hover:bg-gray-100 transition ${
            n.read ? "bg-gray-50" : "bg-yellow-100"
          }`}
        >

          {/* ✅ Read / Unread checkbox */}
          <input
            type="checkbox"
            checked={n.read}
            onChange={() =>
              setNotifications(prev =>
                prev.map(x =>
                  x._id === n._id
                    ? { ...x, read: !x.read }
                    : x
                )
              )
            }
            className="mt-1 cursor-pointer"
          />

          {/* ✅ Message */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">
              {n.message}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>

        </div>
      ))

    )}

  </div>
)}

    </div>

    <Link to="/" className="hover:underline font-medium">
      Logout
    </Link>

  </div>

</header>


     <motion.main
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="p-6 space-y-10"
> {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-4 gap-6">
  <StatCard
    title="Total Projects"
    value={stats.total}
    color="bg-blue-50 border-blue-200"
  />

  <StatCard
    title="Pending Projects"
    value={stats.pending}
    color="bg-yellow-50 border-yellow-200"
  />

  <StatCard
    title="Completed Projects"
    value={stats.completed}
    color="bg-green-50 border-green-200"
  />

  <StatCard
    title="Due This Week"
    value={stats.dueThisWeek}
    color="bg-purple-50 border-purple-200"
  />
</div>

        {/* ================= CHART + DEADLINES ================= */}
        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/40">

            <h2 className="font-semibold mb-5">
              Project Status Overview
            </h2>
           <PieChartLive />
 
          </div>
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="font-semibold mb-4">
              Upcoming Deadlines
            </h2>
            <DeadlineList projects={projects} />
          </div>

        </div>


<div className="flex gap-4 mb-4">

  <input
    type="text"
    placeholder="Search projects..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 border rounded-md px-3 py-2"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border rounded-md px-3 py-2"
  >
    <option value="All">All</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>

</div>

        {/* ================= PROJECTS TABLE ================= */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-h-[400px] overflow-y-auto">



          <h2 className="font-semibold mb-4">
            Recent Project Requests
          </h2>

          <ProjectsTable
            
  projects={filteredProjects}

            onStatusChange={updateStatus}
            onSelect={setSelectedProject}
            onDelete={deleteProject}
          />
        </div>
       <KanbanBoard
  projects={filteredProjects}
  onStatusChange={updateStatus}
/>

</motion.main>

      {/* ================= PROJECT MODAL ================= */}
      {selectedProject && (
       <ProjectModal
  project={selectedProject}
  onClose={() => setSelectedProject(null)}
  onUpdate={(updated) => {
    setProjects(prev =>
      prev.map(p => p._id === updated._id ? updated : p)
    );
    setSelectedProject(updated);
  }}
  
/>

      )}
    </div>
  );
 


/* ================= COMPONENTS (UNCHANGED UI) ================= */

function StatCard({ title, value, color }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-sm border ${color}`}
    >
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-semibold mt-2 text-gray-800">
        {value}
      </p>
    </div>
  );
}




function PieStatusChart({ stats }) {
  const data = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
  ];
const COLORS = ["#8b5cf6", "#fde047"];




  return (
    <div className="h-60 w-full">

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function ProjectsTable({ projects, onStatusChange, onSelect, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
         <tr className="text-left">
  <th className="p-4">Customer</th>
  <th className="p-4">Email</th>
  <th className="p-4">Phone</th>
  <th className="p-4">Project</th>
  <th className="p-4">Status</th>
  <th className="p-4">Due</th>
  <th className="p-4"></th>
</tr>

        </thead>

        <tbody>
          {projects.map((p) => (
            <tr
              key={p._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium text-gray-800">
                {p.name}
              </td>
<td className="p-4 text-gray-600">{p.email}</td>
<td className="p-4 text-gray-600">{p.phone}</td>

             
                <td
  className="p-4 text-blue-600 cursor-pointer hover:underline"
  onClick={() => onSelect(p)}
>
  {p.projectType}
</td>


              <td className="p-4">
                <select
                  value={p.status}
                  onChange={(e) =>
                    onStatusChange(p._id, e.target.value)
                  }
                  className="px-3 py-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </td>

              <td className="p-4 text-gray-600">
                {new Date(p.deadline).toDateString()}
              </td>

              <td className="p-4">
                <button
                  onClick={() => onDelete(p._id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectModal({ project, onClose, onUpdate }) {
  useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(project.tasks || []);
  const [files, setFiles] = useState(project.files || []);

  /* ================= ADD TASK ================= */
  const addTask = async () => {
    if (!taskText.trim()) return;

    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `http://localhost:5000/api/projects/${project._id}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: taskText }),
      }
    );

    const updatedProject = await res.json();
    setTasks(updatedProject.tasks);
    onUpdate(updatedProject);

    setTaskText("");
  };

  /* ================= TOGGLE TASK ================= */
  const toggleTask = async (taskId) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `http://localhost:5000/api/projects/${project._id}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedProject = await res.json();
    setTasks(updatedProject.tasks);
    onUpdate(updatedProject);
  };

  /* ================= DELETE TASK ================= */
  const deleteTask = async (taskId) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `http://localhost:5000/api/projects/${project._id}/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Delete failed");
      return;
    }

    const updatedProject = await res.json();
    setTasks(updatedProject.tasks);
    onUpdate(updatedProject);
  };

  /* ================= FILE HANDLING ================= */
  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };
  const completedTasks =
  (tasks || []).filter(t => t.completed).length;

const progress =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
>
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.25 }}
  className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 space-y-6"
>


        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-indigo-600">
            {project.projectType}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
              ${project.status === "Completed"
                ? "bg-purple-100 text-purple-700"

                : "bg-yellow-100 text-yellow-700"}`}
          >
            {project.status}
          </span>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <p><b>Name:</b> {project.name}</p>
          <p><b>Email:</b> {project.email}</p>
          <p><b>Phone:</b> {project.phone}</p>
          <p><b>Deadline:</b> {new Date(project.deadline).toDateString()}</p>
        </div>

       
        {/* PROGRESS */}
<div>
  <div className="flex justify-between text-sm mb-1">
    <span className="font-medium">Progress</span>
    <span className="font-semibold text-indigo-600">
      {progress}%
    </span>
  </div>

  <div className="w-full h-3 bg-gray-200 rounded-full">
    <div
      className="h-3 bg-indigo-500 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    />
  </div>
</div>


        {/* ADD TASK */}
        <div className="flex gap-2">
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Add
          </button>
        </div>

        {/* TASK TABLE */}
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-2 w-12">Done</th>
              <th className="p-2">Task</th>
              <th className="p-2 w-12"></th>
            </tr>
          </thead>
          
         <tbody>
  {tasks.length === 0 ? (
    <tr>
      <td
        colSpan="3"
        className="text-center text-gray-400 py-6"
      >
        No tasks yet. Add your first task 👆
      </td>
    </tr>
  ) : (
    tasks.map((t) => (
      <tr key={t._id} className="border-t">
        <td className="p-2">
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => toggleTask(t._id)}
          />
        </td>

        <td
          className={`p-2 ${
            t.completed
              ? "line-through text-gray-400"
              : ""
          }`}
        >
          {t.title}
        </td>

        <td className="p-2">
          <button
            onClick={() => deleteTask(t._id)}
            className="text-red-500"
          >
            ✕
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>

        <div>
  <label className="block text-sm font-medium text-gray-600 mb-2">
    Reference Files
  </label>
  {project.files && project.files.length > 0 && (
  <div className="space-y-2 mt-2">
    {project.files.map((file, i) => {
      const url = `http://localhost:5000/${file}`;

      return (
        <div
          key={i}
          className="flex justify-between items-center bg-gray-100 p-2 rounded"
        >
          <span className="truncate text-sm">
            {file.split("/").pop()}
          </span>

          <a
            href={url}
            download
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline text-sm"
          >
            Download
          </a>
        </div>
      );
    })}
  </div>
)}


  <input
    type="file"
    multiple
    onChange={handleFiles}
    className="border p-2 rounded-md w-full"
  />
 


  {/* FILE PREVIEWS */}
  <div className="grid grid-cols-3 gap-3 mt-3">
    {files.map((f, i) => (
      <div key={i} className="relative">
        <img
          src={f.preview}
          alt="preview"
          className="w-full h-24 object-cover rounded"
        />

        <button
          onClick={() =>
            setFiles(files.filter((_, idx) => idx !== i))
          }
          className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>
         {/* MODAL FOOTER */}
<div className="flex justify-end pt-4 border-t">
  <button
    onClick={onClose}
    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition"
  >
    Close
  </button>
</div>



     </motion.div>
</motion.div>

  );
}

}