import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import heroBg from "../assets/hero-bg.png";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">

  {/* BACKGROUND IMAGE */}
 <div
  className="absolute inset-0"
  style={{
    backgroundImage: `url(${heroBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    opacity: 1
  }}
></div>


  {/* Optional gradient overlay for readability */}
 

  {/* FOREGROUND CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center">
    
    {/* LEFT CONTENT */}
    <div className="animate-fade-in">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8">
        Academic Projects <br />
        <span className="text-indigo-600">Built Professionally</span>
      </h1>

      <p className="text-gray-700 text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed">

        We help students deliver high-quality Web, React, Node, Flutter, and
        Final Year projects with clean code and proper guidance.
      </p>

      <div className="flex gap-4">
        <a
          href="/request"
          className="px-8 py-4 text-lg bg-indigo-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          Request a Project
        </a>

        <a
          href="#services"
          className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
        >
          View Services
        </a>
      </div>
    </div>

  </div>
</section>
{/* ABOUT */}
<section id="about" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <div className="animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
        About Us
      </h2>

      <p className="text-gray-600 text-xl leading-relaxed
 mb-6">
        We specialize in building high-quality academic projects for
        school and college students using modern technologies.
      </p>

      <p className="text-gray-600 mb-8">
        Our focus is not just on delivery, but on helping students
        <span className="font-medium text-gray-800">
          {" "}understand the project, explain it confidently, and succeed
        </span>{" "}
        in evaluations and viva.
      </p>

      <div className="flex gap-6">
        <div>
          <h3 className="text-2xl font-bold text-indigo-600">100+</h3>
          <p className="text-sm text-gray-500">Projects Delivered</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-indigo-600">5+</h3>
          <p className="text-sm text-gray-500">Technologies</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-indigo-600">100%</h3>
          <p className="text-sm text-gray-500">Student Satisfaction</p>
        </div>
      </div>
    </div>

    {/* RIGHT */}
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-10 shadow-lg animate-slide-up">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        What Makes Us Different
      </h3>

      <ul className="space-y-4 text-gray-700">
        <li>✔ Curriculum-based project design</li>
        <li>✔ Clean, well-structured code</li>
        <li>✔ Complete documentation & diagrams</li>
        <li>✔ Viva & presentation guidance</li>
        <li>✔ Friendly, reliable support</li>
      </ul>
    </div>

  </div>
</section>

{/* SERVICES */}
<section id="services" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Heading */}
    <div className="text-center mb-16 animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Our Services
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        High-quality academic projects built using modern technologies,
        tailored to your curriculum and requirements.
      </p>
    </div>

    {/* Service Cards */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
      
      {[
        {
          title: "Web Development",
          desc: "Responsive, modern websites using HTML, CSS, JavaScript, and frameworks."
        },
        {
          title: "React & Node Projects",
          desc: "Full-stack projects with clean architecture and real-world use cases."
        },
        {
          title: "Flutter Applications",
          desc: "Cross-platform mobile apps with beautiful UI and smooth performance."
        },
        {
          title: "Mini Projects",
          desc: "Well-scoped projects perfect for internal assessments and demos."
        },
        {
          title: "Final Year Projects",
          desc: "Complete solutions with documentation, diagrams, and viva support."
        },
        {
          title: "Technical Guidance",
          desc: "One-on-one explanation, debugging help, and submission guidance."
        }
      ].map((service, index) => (
        <div
          key={index}
          className="bg-white border rounded-2xl p-8 shadow-md hover:shadow-xl transition animate-slide-up"
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {service.desc}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>

{/* WHY CHOOSE US */}
<section id="why" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Heading */}
    <div className="text-center mb-16 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        Why Choose Us
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        We don’t just deliver projects — we help you understand, present,
        and succeed with confidence.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-10">
      
      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition animate-slide-up">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6 text-xl">
          🎯
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Student-Focused Approach
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          Projects are built according to your syllabus, level,
          and academic requirements — not generic templates.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition animate-slide-up delay-100">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6 text-xl">
          ⏱️
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          On-Time Delivery
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          We respect deadlines. Your project will be delivered
          on time with proper documentation and testing.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition animate-slide-up delay-200">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6 text-xl">
          🧠
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Complete Guidance
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          We explain the project, help with viva questions,
          and guide you until submission.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition animate-slide-up delay-300">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6 text-xl">
          💻
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Clean & Modern Code
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          Well-structured, readable, and modern code using
          React, Node, Flutter, and industry practices.
        </p>
      </div>

      {/* Card 5 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition animate-slide-up delay-400">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6 text-xl">
          📄
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Proper Documentation
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          Includes reports, flow diagrams, and explanations
          needed for evaluations and reviews.
        </p>
      </div>

      {/* Card 6 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition animate-slide-up delay-500">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6 text-xl">
          🤝
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Trusted Support
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          Friendly communication, continuous updates,
          and support even after delivery.
        </p>
      </div>

    </div>
  </div>
</section>
{/* CALL TO ACTION */}
<section className="py-24 bg-indigo-600 relative overflow-hidden">
  
  {/* Decorative blur */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500 opacity-30 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6 text-center animate-fade-in">
    
    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
      Ready to Start Your Project?
    </h2>

    <p className="text-indigo-100 max-w-2xl mx-auto mb-10 text-lg">
      Get your academic project built with clean code, proper documentation,
      and full guidance — delivered on time.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <a
        href="/request"
        className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
      >
        Request a Project
      </a>

      <a
        href="#services"
        className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300"
      >
        View Services
      </a>
    </div>

  </div>
</section>
{/* CONTACT */}
<section id="contact" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
  <div className="max-w-4xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-16 animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Contact Us
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Have a project in mind? Reach out to us and we’ll get back to you shortly.
      </p>
    </div>

    {/* Content */}
    <div className="grid md:grid-cols-2 gap-10">

      {/* INFO */}
      <div className="space-y-6 animate-slide-up">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Email
          </h3>
          <p className="text-gray-700 text-lg">support@studentprojects.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            WhatsApp
          </h3>
          <p className="text-gray-700 text-lg">+91 XXXXX XXXXX</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Support Hours
          </h3>
          <p className="text-gray-700 text-lg">10:00 AM – 7:00 PM</p>
        </div>

        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white
                     font-semibold shadow hover:-translate-y-0.5 hover:shadow-lg transition"
        >
          Chat on WhatsApp
        </a>
      </div>

      {/* FORM */}
      <form className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold
                       rounded-xl shadow hover:-translate-y-0.5 hover:shadow-lg transition"
          >
            Send Message
          </button>
        </div>
      </form>

    </div>
  </div>
</section>

<Footer />

    </>
  );
}
