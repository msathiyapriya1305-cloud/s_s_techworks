export default function DeadlineTracker({ projects }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-semibold mb-4">
        Upcoming Deadlines
      </h3>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li
            key={p._id}
            className={`flex justify-between p-3 rounded-lg
              ${p.overdue ? "bg-red-50" : "bg-gray-50"}`}
          >
            <span className="font-medium">{p.name}</span>
            <span
              className={`text-sm ${
                p.overdue ? "text-red-600" : "text-gray-600"
              }`}
            >
              {p.deadline}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
