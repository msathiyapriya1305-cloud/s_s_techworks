import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, label }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${
          isActive(to)
            ? "bg-indigo-100 text-indigo-700"
            : "text-gray-700 hover:text-indigo-600 hover:-translate-y-0.5"
        }
      `}
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-md">
  <div className="max-w-7xl mx-auto px-6 h-[100px] flex items-center justify-between">

    {/* LOGO */}
    <Link
      to="/"
      onClick={() => setOpen(false)}
      className="flex items-center h-full"
    >
      <img
        src={logo}
        alt="S&S Techworks"
        className="h-full max-h-[550px] w-auto object-contain"
      />
    </Link>

    {/* DESKTOP NAV */}
    <div className="hidden md:flex items-center gap-2">
      <NavItem to="/" label="Home" />
      <NavItem to="/about" label="About" />
      <NavItem to="/services" label="Services" />
      <NavItem to="/portfolio" label="Portfolio" />
      <NavItem to="/contact" label="Contact" />
    </div>


          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              to="/request"
              className="hidden md:inline-block px-5 py-2.5 rounded-lg
                         bg-indigo-600 text-white text-sm font-semibold
                         shadow-md transition-all duration-300
                         hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Project
            </Link>

            {/* ADMIN ICON */}
            <Link
              to="/admin"
              title="Admin Login"
              className="w-10 h-10 flex items-center justify-center rounded-full
                         border border-indigo-200 text-indigo-600
                         hover:bg-indigo-50 hover:-translate-y-0.5
                         transition-all duration-300"
            >
              👤
            </Link>

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden flex flex-col gap-1.5"
            >
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-indigo-600">
            StudentProjects
          </h2>
          <button onClick={() => setOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <NavItem to="/" label="Home" />
          <NavItem to="/about" label="About" />
          <NavItem to="/services" label="Services" />
          <NavItem to="/portfolio" label="Portfolio" />
          <NavItem to="/contact" label="Contact" />

          <Link
            to="/request"
            onClick={() => setOpen(false)}
            className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white
                       font-semibold text-center shadow transition hover:shadow-lg"
          >
            Get Project
          </Link>

          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 rounded-xl border border-indigo-200
                       text-indigo-600 font-semibold text-center
                       hover:bg-indigo-50 transition"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </>
  );
}
