import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Portfolio
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-6 border border-gray-200 rounded-lg"
            >
              <h3 className="font-semibold mb-2">
                Project {item}
              </h3>
              <p className="text-sm text-gray-600">
                Web / Mobile application developed for academic use.
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
