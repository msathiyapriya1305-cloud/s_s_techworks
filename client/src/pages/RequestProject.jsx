import { useState } from "react";
import Navbar from "../components/Navbar";
import bgImage from "../assets/request-bg.png";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestProject() {
  /* ================= STATE ================= */
  const [dragActive, setDragActive] = useState(false);

const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  projectType: "",
  deadline: "",
  description: "",
});

const fieldsFilled = Object.values(form).filter(Boolean).length;
const progress = Math.round((fieldsFilled / 6) * 100);


  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
 const [errors, setErrors] = useState({
  email: "",
  phone: "",
  deadline: "",
});
const handleDrop = (e) => {
  e.preventDefault();
  setDragActive(false);

  const dropped = Array.from(e.dataTransfer.files);
  setFiles(dropped);
};

const handleDrag = (e) => {
  e.preventDefault();
  setDragActive(true);
};

const handleDragLeave = () => {
  setDragActive(false);
};


/* ================= VALIDATION ================= */

const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  if (!regex.test(phone)) {
    return "Phone number must be 10 digits";
  }
  return "";
};

const validateDeadline = (date) => {
  if (!date) return "Please select a deadline";

  const today = new Date();
  const selected = new Date(date);

  today.setHours(0, 0, 0, 0);

  if (selected < today) {
    return "Deadline cannot be in the past";
  }

  return "";
};
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "Enter a valid email address";
  }
  return "";
};


  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({ ...form, [name]: value });
if (name === "email") {
  setErrors((prev) => ({
    ...prev,
    email: validateEmail(value),
  }));
}

  // live validation
  if (name === "phone") {
    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(value),
    }));
  }

  if (name === "deadline") {
    setErrors((prev) => ({
      ...prev,
      deadline: validateDeadline(value),
    }));
  }
};

const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files);

  const validFiles = selectedFiles.filter((file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name} is too large (max 5MB)`);
      return false;
    }
    return true;
  });

  setFiles(validFiles);
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const emailError = validateEmail(form.email);
  const phoneError = validatePhone(form.phone);
  const deadlineError = validateDeadline(form.deadline);

  if (emailError || phoneError || deadlineError) {
    setErrors({
      email: emailError,
      phone: phoneError,
      deadline: deadlineError,
    });
    return;
  }





    setLoading(true);
    setError(false);
    setSuccess(false);
    if (
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.projectType ||
    !form.deadline
  ) {
    setError(true);
    setLoading(false);
    return;
  }

    try {
      const formData = new FormData();

      formData.append("name", form.name);
formData.append("email", form.email);
formData.append("phone", form.phone);
formData.append("projectType", form.projectType);
formData.append("description", form.description);
formData.append("deadline", form.deadline);


      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
  const data = await res.json();
  console.error(data);
  throw new Error(data.message || "Failed");
}


      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        deadline: "",
        description: "",
      });
      setFiles([]);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-[120px] pb-24 overflow-hidden">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm" />

        {/* CONTENT */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          {/* LEFT */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Tell Us About <br />
              <span className="text-indigo-600">Your Project</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10">
              Share your project idea with us and we’ll help you turn it into a{" "}
              <span className="font-medium text-gray-700">
                high-quality academic solution
              </span>
              .
            </p>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>✔ Academic & real-world project support</li>
              <li>✔ Clean code & best practices</li>
              <li>✔ Complete explanation & viva prep</li>
              <li>✔ On-time delivery</li>
            </ul>
          </div>

          {/* FORM */}
            <form 
  onSubmit={handleSubmit}
  className="space-y-7 bg-white/80 p-8 rounded-2xl shadow-lg"
>

  {/* 🔥 FORM PROGRESS BAR — paste here */}
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>Form Completion</span>
      <span>{progress}%</span>
    </div>

    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-indigo-600 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>

  {/* NAME */}
  

            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
            {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email}
  </p>
)}

            {/* EMAIL */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />

            {/* PHONE */}
            <Input
              label="Phone / WhatsApp"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
            {errors.phone && (
  <p className="text-red-500 text-sm mt-1">
    {errors.phone}
  </p>
)}


            {/* PROJECT TYPE */}
            <div>
              <label className="font-semibold text-indigo-600">
                Project Type
              </label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
                className="w-full mt-2 px-5 py-3 rounded-xl border"
              >
                <option value="">Select project type</option>
                <option>Web Development</option>
                <option>React / Node</option>
                <option>Flutter App</option>
                <option>Mini Project</option>
                <option>Final Year Project</option>
              </select>
            </div>

            {/* DEADLINE */}
           <Input
  label="Expected Deadline"
  name="deadline"
  type="date"
  value={form.deadline}
  onChange={handleChange}
  min={new Date().toISOString().split("T")[0]}
/>

            {errors.deadline && (
  <p className="text-red-500 text-sm mt-1">
    {errors.deadline}
  </p>
)}


            {/* DESCRIPTION */}
            <div>
              <label className="font-semibold text-indigo-600">
                Project Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full mt-2 px-5 py-3 rounded-xl border resize-none"
              />
            </div>

            {/* FILES */}
            <div
  onDrop={handleDrop}
  onDragOver={handleDrag}
  onDragLeave={handleDragLeave}
  className={`border-2 border-dashed p-6 rounded-xl text-center transition
    ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
>
  <p>Drag & drop files here or click to upload</p>
{files.length > 0 && (
  <ul className="mt-2 text-sm text-gray-600">
    {files.map((f, i) => (
      <li key={i}>📎 {f.name}</li>
    ))}
  </ul>
)}

  <input
    type="file"
    multiple
    onChange={handleFileChange}
    className="hidden"
    id="fileUpload"
  />

  <label
    htmlFor="fileUpload"
    className="cursor-pointer text-indigo-600 underline"
  >
    Browse Files
  </label>
</div>


            {/* STATUS */}
            {success && (
              <p className="text-green-600 font-medium">
                ✅ Project submitted successfully!
              </p>
            )}
            {error && (
              <p className="text-red-600 font-medium">
                ❌ Submission failed. Try again.
              </p>
            )}

            <AnimatePresence>
  {success && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-green-600">
          ✅ Project Submitted!
        </h2>

        <button
          onClick={() => setSuccess(false)}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>


            {/* SUBMIT */}
            <button
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white text-lg
                         rounded-2xl hover:bg-indigo-700 transition"
            >
              {loading ? "Submitting..." : "Send Project Details"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

/* ================= REUSABLE INPUT ================= */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="font-semibold text-indigo-600">{label}</label>
      <input
        {...props}
        required
        className="w-full mt-2 px-5 py-3 rounded-xl border"
        
      />
    </div>
  );
}
