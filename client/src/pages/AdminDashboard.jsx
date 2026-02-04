import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminDashboard() {
  /* ================= MOCK DATA (LATER FROM BACKEND) ================= */

  const stats = {
    total: 24,
    pending: 8,
    completed: 14,
    dueThisWeek: 3,
  };

  const projects = [
    {
      name: "Arun Kumar",
      project: "React Final Year Project",
      status: "Pending",
      due: "12 Feb 2026",
      overdue: false,
    },
    {
      name: "Priya",
      project: "Flutter App",
      status: "Completed",
      due: "05 Feb 2026",
      overdue: false,
    },
    {
      name: "Rahul",
      project: "Node.js Mini Project",
      status: "Pending",
      due: "08 Feb 2026",
      overdue: true,
    },
  ];

  const chartData = [
    { label: "Completed", value: 14, color: "bg-green-500" },
    { label: "Pending", value: 8, color: "bg-yellow-500" },
    { label: "Overdue", value: 2, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP BAR ================= */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>

        <Link
          to="/"
          className="text-sm text-indigo-600 hover:underline"
        >
          Logout
        </Link>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="p-6 space-y-10">

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Total Projects" value={stats.total} />
          <StatCard title="Pending Projects" value={stats.pending} />
          <StatCard title="Completed Projects" value={stats.completed} />
          <StatCard title="Due This Week" value={stats.dueThisWeek} />
        </div>

        {/* ================= CHART + DEADLINES ================= */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* STATUS CHART */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-5">
              Project Status Overview
            </h2>
            <StatusChart data={chartData} />
          </div>

          {/* UPCOMING DEADLINES */}
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="font-semibold mb-4">
              Upcoming Deadlines
            </h2>
            <DeadlineList projects={projects} />
          </div>

        </div>

        {/* ================= PROJECTS TABLE ================= */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">
            Recent Project Requests
          </h2>
          <ProjectsTable projects={projects} />
        </div>

        {/* ================= ADMIN NOTES ================= */}
        <AdminNotes />

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

/* STAT CARD */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-indigo-600 mt-2">
        {value}
      </p>
    </div>
  );
}

/* STATUS CHART */
function StatusChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-4">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex justify-between text-sm mb-1">
            <span>{d.label}</span>
            <span>{d.value}</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded">
            <div
              className={`h-3 rounded ${d.color}`}
              style={{ width: `${(d.value / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* DEADLINE LIST */
function DeadlineList({ projects }) {
  return (
    <ul className="space-y-3">
      {projects.map((p, i) => (
        <li
          key={i}
          className={`flex justify-between items-center p-3 rounded-md
            ${p.overdue ? "bg-red-50" : "bg-gray-50"}`}
        >
          <div>
            <p className="font-medium text-gray-800">
              {p.project}
            </p>
            <p className="text-sm text-gray-500">
              {p.name}
            </p>
          </div>

          <span
            className={`text-sm font-medium
              ${p.overdue ? "text-red-600" : "text-gray-600"}`}
          >
            {p.due}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* PROJECTS TABLE */
function ProjectsTable({ projects }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Customer</th>
            <th>Project</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2">{p.name}</td>
              <td>{p.project}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs
                    ${
                      p.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : p.overdue
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {p.status}
                </span>
              </td>
              <td>{p.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ADMIN NOTES */
function AdminNotes() {
  const [note, setNote] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-3">
        Internal Admin Notes
      </h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows="4"
        className="w-full border rounded-md p-3
                   focus:ring-2 focus:ring-indigo-500"
        placeholder="Notes only visible to admins..."
      />

      <button
        className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md
                   hover:bg-indigo-700 transition"
      >
        Save Note
      </button>
    </div>
  );
}
