import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Services() {
  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Our Services
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Web Development",
            "React & Node Projects",
            "Flutter Applications",
            "Mini Projects",
            "Final Year Projects",
            "Technical Guidance",
          ].map((service) => (
            <div
              key={service}
              className="p-6 border border-gray-200 rounded-lg hover:shadow transition"
            >
              <h3 className="font-semibold text-indigo-600 mb-2">
                {service}
              </h3>
              <p className="text-gray-600 text-sm">
                Professionally built with clean code and documentation.
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
