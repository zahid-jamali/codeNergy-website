"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Scroll Animation
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("contact-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      message: e.target.message.value.trim(),
    };
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message === ""
    ) {
      return alert("Please fill all the fields");
    }

    try {
      // Example: Send to backend
      const res = await fetch("/api/messages/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess(true);
      e.target.reset();
    } catch (err) {
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="relative py-16 sm:py-24 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Design */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 400 Q 480 300, 960 400 T 1920 400"
            stroke="#ff0000"
            strokeWidth="2"
          />
          <path
            d="M0 500 Q 480 600, 960 500 T 1920 500"
            stroke="#ff0000"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="960" cy="400" r="6" fill="#ff0000" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-red-600 text-sm sm:text-base font-semibold tracking-wider uppercase inline-flex items-center justify-center">
            <span className="inline-block w-12 h-px bg-red-600 mr-3"></span>
            Contact Us
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="text-white">Get in </span>
            <span className="text-red-600">Touch</span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Have questions or need a custom solution for your business? Our team
            is ready to assist you with expert IT guidance and tailored
            services.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="w-full lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300 resize-none"
                  />
                </div>

                {/* ✅ Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto inline-flex items-center justify-center bg-red-600 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-red-500"
                  }`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>

                {/* ✅ Success Message */}
                {success && (
                  <p className="flex items-center text-green-400 mt-4 font-medium">
                    <FaCheckCircle className="w-5 h-5 mr-2" />
                    Message sent successfully!
                  </p>
                )}
              </form>
            </motion.div>

            {/* Right: Google Map */}
            <motion.div
              className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden shadow-2xl border border-red-800/50"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.668316365456!2d-0.127758384316!3d51.503441179636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900000000%3A0x7b5e3c8f00b6a3d!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1698765432100!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location - London Office"
                className="absolute inset-0"
              />

              <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm border border-red-800/50 rounded-lg p-4 max-w-xs shadow-xl">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <p className="text-white font-bold text-lg">
                      London Office
                    </p>
                    <p className="text-gray-300 text-sm">
                      Riverside Building, County Hall,
                      <br />
                      Westminster Bridge Rd, London SE1 7PB,
                      <br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <a
                    href="tel:+442079202000"
                    className="flex items-center text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <FaPhone className="w-4 h-4 mr-2" />
                    +44 20 7920 2000
                  </a>
                  <a
                    href="mailto:info@example.com"
                    className="flex items-center text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <FaEnvelope className="w-4 h-4 mr-2" />
                    info@example.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
