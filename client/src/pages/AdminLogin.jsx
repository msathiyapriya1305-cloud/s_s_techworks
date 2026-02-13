import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import adminBg from "../assets/admin.png";
import meenaImg from "../assets/meena.jpeg";
import sathiyaImg from "../assets/sathiya.jpeg";

export default function AdminLogin() {
const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [mounted, setMounted] = useState(false);
const [lastLoginText, setLastLoginText] = useState("");
const [loginSuccess, setLoginSuccess] = useState(false);

const [attempts, setAttempts] = useState(0);
const [locked, setLocked] = useState(false);
const [lockTimer, setLockTimer] = useState(30);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const cleanEmail = email.toLowerCase().trim();

/* ================= MOUNT ================= */

useEffect(() => {
setMounted(true);


// If already logged in → go dashboard
const token = localStorage.getItem("adminToken");
if (token) navigate("/admin/dashboard");


}, [navigate]);

/* ================= LOCK TIMER ================= */

useEffect(() => {
if (!locked) return;

const timer = setInterval(() => {
  setLockTimer((prev) => {
    if (prev <= 1) {
      clearInterval(timer);
      setLocked(false);
      setAttempts(0);
      return 30;
    }
    return prev - 1;
  });
}, 1000);

return () => clearInterval(timer);


}, [locked]);

/* ================= USER AVATAR ================= */

const getUserData = () => {
if (cleanEmail === "[sakthimeena.gp03@gmail.com](mailto:sakthimeena.gp03@gmail.com)")
return { name: "Meena", avatar: meenaImg };

if (cleanEmail === "msathiyapriya1305@gmail.com")
  return { name: "Sathiya", avatar: sathiyaImg };

return { name: "", avatar: null };


};

const { name, avatar } = getUserData();

/* ================= LAST LOGIN ================= */

useEffect(() => {
if (!name) return setLastLoginText("");

const saved = localStorage.getItem(`lastLogin_${cleanEmail}`);

if (!saved) {
  setLastLoginText(`${name} — First login`);
  return;
}

const date = new Date(saved);

const formatted =
  date.toLocaleDateString() +
  " at " +
  date.toLocaleTimeString();

setLastLoginText(`${name} — Last login: ${formatted}`);


}, [cleanEmail, name]);

/* ================= LOGIN ================= */

const handleSubmit = async (e) => {
e.preventDefault();
setError("");

if (locked || loginSuccess) return;

try {
  const res = await fetch(
    "http://localhost:5000/api/admin/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cleanEmail,
        password,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.token)
    throw new Error("Invalid login");

  // Save auth data
  localStorage.setItem("adminToken", data.token);
  localStorage.setItem(
    "adminUser",
    JSON.stringify({ email: cleanEmail })
  );
  localStorage.setItem(
    `lastLogin_${cleanEmail}`,
    new Date().toISOString()
  );

  setLoginSuccess(true);

  setTimeout(() => {
    navigate("/admin/dashboard");
  }, 1000);

} catch (err) {
  console.error(err);
  setError("Invalid credentials");

  const newAttempts = attempts + 1;
  setAttempts(newAttempts);

  if (newAttempts >= 3) setLocked(true);
}


};

/* ================= UI ================= */

return ( <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${adminBg})` }}
  />

  <Link
    to="/"
    className="absolute top-6 left-6 z-20 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
  >
    ← Back
  </Link>

  <div
    className={`relative z-10 w-full max-w-sm mx-6 bg-white rounded-xl shadow-2xl transition-all
    ${mounted ? "animate-card-bounce" : "opacity-0"}`}
  >

    {/* Avatar */}
    <div className="flex justify-center pt-8">
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full border-2 border-indigo-500"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
          👤
        </div>
      )}
    </div>

    {/* Header */}
    <div className="text-center px-6 pt-4 pb-4 border-b">
      <h1 className="text-lg font-semibold">
        Admin Login
      </h1>

      {lastLoginText && (
        <p className="text-xs text-gray-500 mt-2">
          {lastLoginText}
        </p>
      )}
    </div>

    {/* Error */}
    {error && (
      <p className="text-red-600 text-center mt-4">
        {error}
      </p>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 text-sm text-indigo-600 cursor-pointer"
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <button
        type="submit"
        disabled={locked}
        className="w-full py-2 bg-indigo-600 text-white rounded-md"
      >
        {locked ? `Locked (${lockTimer}s)` : "Sign in"}
      </button>

    </form>
  </div>

  {/* Success Overlay */}
  {loginSuccess && (
    <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center z-30">
      <h2 className="text-white text-xl font-bold">
        ✅ Login Successful
      </h2>
    </div>
  )}

  {/* Animation */}
  <style>{`
    @keyframes cardBounce {
      0% { transform: translateY(40px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .animate-card-bounce {
      animation: cardBounce 0.6s ease-out;
    }
  `}</style>

</div>


);
}
