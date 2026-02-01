import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext"; 

export default function Contact() {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(
        "https://yessghor-server.vercel.app/contact",
        formData
      );
      if (res.data.success) {
        setSuccess(
          language === "en"
            ? "Message sent successfully!"
            : "মেসেজ সফলভাবে পাঠানো হয়েছে!"
        );
        setFormData({ name: "", email: "", message: "" }); // reset form
      }
    } catch (err) {
      console.error(err);
      setError(
        language === "en"
          ? "Failed to send message. Please try again."
          : "মেসেজ পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          {language === "en" ? "Contact Us" : "যোগাযোগ করুন"}
        </h2>
        <p className="text-gray-500 mt-2">
          {language === "en"
            ? "Have questions about renting a house? We’re here to help."
            : "বাড়ি ভাড়া সংক্রান্ত কোনো প্রশ্ন থাকলে আমরা সাহায্য করতে প্রস্তুত।"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {language === "en" ? "Get in Touch" : "যোগাযোগ করুন"}
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
            <span className="text-gray-600">Dhaka, Bangladesh</span>
          </div>

          <p className="text-gray-500 text-sm pt-4">
            {language === "en"
              ? "We usually respond within 24 hours."
              : "আমরা সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিই।"}
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-sm space-y-6"
        >
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === "en" ? "Full Name" : "পূর্ণ নাম"}
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={
                language === "en" ? "Your name" : "আপনার নাম লিখুন"
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === "en" ? "Email Address" : "ইমেইল ঠিকানা"}
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={
                language === "en" ? "your@email.com" : "আপনার ইমেইল লিখুন"
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === "en" ? "Message" : "বার্তা"}
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder={
                language === "en"
                  ? "Tell us what you're looking for..."
                  : "আপনি কী খুঁজছেন তা আমাদের জানান..."
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-[#073032] cursor-pointer hover:text-white text-[#073032] border-2 border-[#073032] py-2.5 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading
              ? language === "en"
                ? "Sending..."
                : "পাঠানো হচ্ছে..."
              : language === "en"
              ? "Send Message"
              : "বার্তা পাঠান"}
          </button>
        </form>
      </div>
    </section>
  );
}
