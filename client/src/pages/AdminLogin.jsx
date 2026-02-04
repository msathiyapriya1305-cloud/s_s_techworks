import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import adminBg from "../assets/admin.png";
import googleIcon from "../assets/google.png";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${adminBg})` }}
      />

      {/* BACK BUTTON */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md
                     bg-indigo-600 text-white text-sm font-medium
                     hover:bg-indigo-700 transition"
        >
          ← Back
        </Link>
      </div>

      {/* CARD */}
      <div
        className={`relative z-10 w-full max-w-sm mx-6
                    bg-white border border-gray-200 shadow-2xl
                    rounded-lg
                    animate-card-bounce
                    ${error ? "animate-shake" : ""}`}
      >

        {/* AVATAR */}
        <div className="flex justify-center pt-8">
          <div className="w-16 h-16 rounded-full
                          bg-indigo-50 border border-indigo-200
                          flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="w-8 h-8 text-indigo-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 20.25a7.5 7.5 0 0115 0"
              />
            </svg>
          </div>
        </div>

        {/* HEADER */}
        <div className="px-6 pt-4 pb-4 text-center border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Login
          </h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* EMAIL */}
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2
                             text-gray-400 transition-all
                             group-focus-within:text-indigo-600">
              ✉️
            </span>

            <input
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full pl-11 pr-3 py-2 border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2
                             text-gray-400 transition-all
                             group-focus-within:text-indigo-600">
              🔒
            </span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full pl-11 pr-20 py-2 border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-xs text-indigo-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md
                       bg-indigo-600 text-white font-medium
                       hover:bg-indigo-700 transition
                       disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="px-6 py-5 border-t border-gray-200 space-y-4">

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-3
                       py-2.5 rounded-md
                       border border-indigo-300
                       text-indigo-600 font-medium
                       hover:bg-indigo-50 transition"
          >
            <img src={googleIcon} alt="Google" className="w-4 h-4" />
            Sign in with Google
          </button>

        </div>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        @keyframes bounceIn {
          0% { transform: scale(0.95); opacity: 0; }
          60% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-card-bounce {
          animation: bounceIn 0.6s ease-out;
        }
        `}
      </style>
    </div>
  );
}
