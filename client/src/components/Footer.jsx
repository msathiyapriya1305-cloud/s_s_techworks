import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            StudentProjects
          </h3>
          <p className="text-sm text-gray-400">
            Professional academic project development for school and
            college students with complete guidance and support.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Web Development</li>
            <li>React & Node Projects</li>
            <li>Flutter Applications</li>
            <li>Mini & Final Year Projects</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#services" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="#why" className="hover:text-white transition">
                Why Choose Us
              </a>
            </li>
            <li>
              <Link to="/request" className="hover:text-white transition">
                Request Project
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@studentprojects.com</li>
            <li>WhatsApp: +91 XXXXX XXXXX</li>
            <li>Support: 10AM – 7PM</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StudentProjects. All rights reserved.
      </div>
    </footer>
  );
}
