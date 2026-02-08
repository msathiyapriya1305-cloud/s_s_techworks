import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PieChartLive() {
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
  });

  const fetchStats = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      "http://localhost:5000/api/projects/stats",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  const data = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
  ];

  const COLORS = ["#8b5cf6", "#fde047"];

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={90} label>
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
