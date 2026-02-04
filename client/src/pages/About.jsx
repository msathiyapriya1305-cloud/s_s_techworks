import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          About Us
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          We specialize in building academic and real-world projects for
          students using modern technologies like React, Node.js, and Flutter.
          Our focus is on clean code, proper documentation, and complete
          guidance.
        </p>
      </section>
      <Footer />
    </>
  );
}
