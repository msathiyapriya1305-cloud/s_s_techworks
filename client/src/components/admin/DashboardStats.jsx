export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: "Total Projects", value: stats.total },
        { label: "Completed", value: stats.completed },
        { label: "Pending", value: stats.pending },
        { label: "Overdue", value: stats.overdue },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 shadow"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
