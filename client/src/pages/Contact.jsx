import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Contact Us
        </h1>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300"
          />
          <textarea
            rows="4"
            placeholder="Message"
            className="w-full px-4 py-2 border border-gray-300"
          />
          <button
            className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
