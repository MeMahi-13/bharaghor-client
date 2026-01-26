import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Contact Us
        </h2>
        <p className="text-gray-500 mt-2">
          Have questions about renting a house? We’re here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Get in Touch
          </h3>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-primary text-lg" />
            <span className="text-gray-600">+880 1234 567 890</span>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-primary text-lg" />
            <span className="text-gray-600">support@yessghor.com</span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-primary text-lg" />
            <span className="text-gray-600">
              Dhaka, Bangladesh
            </span>
          </div>

          <p className="text-gray-500 text-sm pt-4">
            We usually respond within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-xl shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Tell us what you're looking for..."
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
