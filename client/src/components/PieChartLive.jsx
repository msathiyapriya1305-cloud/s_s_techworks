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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/projects/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Stats fetch failed:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();

        setStats({
          completed: data.completed || 0,
          pending: data.pending || 0,
        });
      } catch (err) {
        console.error("Stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const data = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
  ];

  const COLORS = ["#8b5cf6", "#fde047"];
  const total = stats.completed + stats.pending;

  return (
    <div className="w-full h-[240px] flex items-center justify-center">

      {/* ✅ Loading */}
      {loading && (
        <p className="text-gray-400 text-sm">
          Loading chart...
        </p>
      )}

      {/* ✅ Empty */}
      {!loading && total === 0 && (
        <p className="text-gray-400 text-sm">
          No project data yet
        </p>
      )}

      {/* ✅ Chart */}
      {!loading && total > 0 && (
        <ResponsiveContainer width="100%" height="100%">
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
      )}

    </div>
  );
}
