import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import adminBg from "../assets/admin.png";
import googleIcon from "../assets/google.png";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  useEffect(() => {
    setMounted(true); // bounce animation on load
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(false);

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ store JWT
    localStorage.setItem("adminToken", data.token);

    // ✅ redirect
    navigate("/admin/dashboard");
  } catch (err) {
    setError(true);
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
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 px-4 py-2
                   bg-indigo-600 text-white text-sm rounded-md
                   hover:bg-indigo-700 transition"
      >
        ← Back
      </Link>

      {/* LOGIN CARD */}
      <div
        className={`relative z-10 w-full max-w-sm mx-6
                    bg-white rounded-xl border border-gray-200
                    shadow-2xl
                    transition-all duration-700
                    ${mounted ? "animate-card-bounce" : "opacity-0"}
                    ${error ? "animate-shake" : ""}`}
      >

        {/* AVATAR */}
        <div className="flex justify-center pt-8">
          <div className="w-16 h-16 rounded-full bg-indigo-100
                          flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0" />
              <path d="M4.5 20.25a7.5 7.5 0 0115 0" />
            </svg>
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center px-6 pt-4 pb-5 border-b">
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Login
          </h1>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="px-6 pt-4">
            <p className="text-sm text-red-600 text-center
                          animate-error-fade">
              Invalid credentials
            </p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

          {/* EMAIL */}
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2
                             text-gray-400 transition-all duration-300
                             group-focus-within:text-indigo-600
                             group-focus-within:scale-110">
              {/* Mail Icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M3 6h18v12H3z" />
                <path d="M3 6l9 6 9-6" />
              </svg>
            </span>

            <input
              type="email"
              placeholder="admin@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-3 py-2.5
                         border border-gray-300 rounded-md
                         focus:ring-2 focus:ring-indigo-500
                         transition"
            />
          </div>

          {/* PASSWORD */}
<div className="relative group">
  <span
    className="absolute left-3 top-1/2 -translate-y-1/2
               text-gray-400 transition-all duration-300
               group-focus-within:text-indigo-600
               group-focus-within:scale-110"
  >
    {/* Lock Icon */}
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  </span>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full pl-11 pr-20 py-2.5
               border border-gray-300 rounded-md
               focus:ring-2 focus:ring-indigo-500
               transition"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2
               text-sm text-indigo-600 hover:underline"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>


          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md
                       bg-indigo-600 text-white font-medium
                       hover:bg-indigo-700
                       hover:-translate-y-0.5
                       transition-all"
          >
            Sign in
          </button>
        </form>

        {/* FOOTER */}
        <div className="px-6 py-5 border-t space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button
            className="w-full flex items-center justify-center gap-3
                       py-2.5 rounded-md
                       border border-indigo-300 text-indigo-600
                       hover:bg-indigo-50 transition"
          >
            <img src={googleIcon} alt="Google" className="w-4 h-4" />
            Sign in with Google
          </button>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes cardBounce {
          0% { transform: translateY(40px) scale(0.95); opacity: 0; }
          60% { transform: translateY(-8px) scale(1.02); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-card-bounce {
          animation: cardBounce 0.8s ease-out;
        }

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

        @keyframes errorFade {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-error-fade {
          animation: errorFade 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
