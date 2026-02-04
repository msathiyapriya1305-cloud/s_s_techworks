import Navbar from "../components/Navbar";
import bgImage from "../assets/request-bg.png";

export default function RequestProject() {
  return (
    <>
      <Navbar />

      {/* SECTION */}
      <section className="relative min-h-screen pt-20 pb-24 overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        {/* WHITE OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm" />

        {/* CONTENT */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT CONTENT */}
          <div className="animate-fade-in max-w-xl">

            {/* HEADING */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Tell Us About <br />
              <span className="text-indigo-600">Your Project</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Share your project idea with us and we’ll help you turn it into a{" "}
              <span className="font-medium text-gray-700">
                well-structured, high-quality academic solution
              </span>{" "}
              — built with clean code and complete guidance.
            </p>

            {/* FEATURES */}
            <ul className="space-y-5 text-lg text-gray-700 mb-10">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 text-xl">✔</span>
                Academic & real-world project support tailored to your syllabus
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 text-xl">✔</span>
                Clean, readable code with proper architecture & best practices
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 text-xl">✔</span>
                Complete explanation, demo support & viva preparation
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 text-xl">✔</span>
                On-time delivery with documentation & revision support
              </li>
            </ul>

            {/* RESPONSE TIME */}
            <div className="text-lg text-gray-600 mb-8">
              Average response time:{" "}
              <span className="font-semibold text-gray-800">
                1–2 hours
              </span>
            </div>

            {/* HOW IT WORKS */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                How this works
              </h3>

              <ol className="space-y-4 text-gray-700 text-base leading-relaxed">
                <li>
                  <span className="font-medium text-gray-900">1.</span>{" "}
                  Submit your project request with requirements, deadline, and any reference files.
                </li>
                <li>
                  <span className="font-medium text-gray-900">2.</span>{" "}
                  Our team reviews your request and contacts you within 1–2 hours for confirmation.
                </li>
                <li>
                  <span className="font-medium text-gray-900">3.</span>{" "}
                  Development begins once details are finalized, with regular updates shared.
                </li>
                <li>
                  <span className="font-medium text-gray-900">4.</span>{" "}
                  You receive the completed project with documentation, explanation, and support.
                </li>
              </ol>
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="animate-slide-up space-y-8 bg-white/80 p-8 rounded-2xl shadow-lg">

            {/* FULL NAME */}
            <div>
              <label className="block text-base font-semibold text-indigo-600 mb-1">
                Full Name
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Enter your full name as per records
              </p>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300
                           text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-base font-semibold text-indigo-600 mb-1">
                Email Address
              </label>
              <p className="text-sm text-gray-500 mb-2">
                We’ll contact you using this email
              </p>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300
                           text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-base font-semibold text-indigo-600 mb-1">
                Phone / WhatsApp Number
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Preferred number for quick communication
              </p>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300
                           text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* PROJECT TYPE */}
            <div>
              <label className="block text-base font-semibold text-indigo-600 mb-1">
                Project Type
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Select the type of project you need
              </p>
              <select
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300
                           text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue=""
              >
                <option value="" disabled>Select project type</option>
                <option>Web Development</option>
                <option>React / Node Project</option>
                <option>Flutter App</option>
                <option>Mini Project</option>
                <option>Final Year Project</option>
              </select>
            </div>

            {/* DEADLINE */}
            <div>
              <label className="block text-base font-semibold text-indigo-600 mb-1">
                Expected Deadline
              </label>
              <p className="text-sm text-gray-500 mb-2">
                When do you need the project completed?
              </p>
              <input
                type="date"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300
                           text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-base font-semibold text-indigo-600 mb-1">
                Project Description
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Briefly explain your requirements
              </p>
              <textarea
                rows="4"
                placeholder="Explain what the project is about..."
                className="w-full px-5 py-3.5 rounded-xl border border-gray-300
                           text-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* FILE UPLOAD */}
            <div>
              <label className="block text-base font-semibold text-indigo-600 mb-1">
                Reference Files (optional)
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Upload documents or screenshots if available
              </p>

              <label className="inline-block cursor-pointer px-6 py-3 rounded-xl
                                 bg-indigo-50 text-indigo-600 font-medium
                                 hover:bg-indigo-100 transition">
                Upload Files
                <input type="file" multiple className="hidden" />
              </label>
            </div>

            {/* SUBMIT */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-10 py-4 bg-indigo-600 text-white
                           text-lg font-semibold rounded-2xl shadow-lg
                           hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                Send Project Details
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
