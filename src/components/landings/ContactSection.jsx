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

  // Scroll animation
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      message: e.target.message.value.trim(),
    };
    if (!formData.name || !formData.email || !formData.message) {
      setLoading(false);
      return alert("Please fill all the fields");
    }

    try {
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
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background */}
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

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 md:mb-8">
              <p className="text-red-600 text-sm font-semibold tracking-wider uppercase flex items-center">
                <span className="inline-block w-10 h-px bg-red-600 mr-3"></span>
                Contact Us
              </p>
              <h2
                id="contact-heading"
                className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              >
                Get in <span className="text-red-600">Touch</span>
              </h2>
              <p className="mt-2 md:mt-3 text-gray-400 text-sm sm:text-base max-w-md">
                Have questions or need a custom solution for your business?
                We’re here to help with expert IT guidance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white font-medium mb-1 md:mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-1 md:mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-medium mb-1 md:mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us how we can help you..."
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center justify-center bg-red-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/40 ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-500"
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </>
                )}
              </button>

              {success && (
                <p className="flex items-center text-green-400 mt-2 md:mt-4 font-medium text-sm sm:text-base">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Message sent successfully!
                </p>
              )}
            </form>
          </motion.div>

          {/* Right: Google Map */}
          <motion.div
            className="relative h-64 sm:h-80 md:h-96 lg:h-full p-3 sm:p-4 rounded-xl overflow-hidden shadow-2xl border border-red-800/50"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.427420517524!2d55.45602357414213!3d25.319909077632165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f26195b7e6b%3A0xc0f6d4eb509bdf75!2sSPC%20Free%20Zone%20-%20Business%20Setup%20In%20Sharjah%2C%20UAE!5e1!3m2!1sen!2s!4v1764577804696!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sharjah Publishing City Free Zone Sharjah, United Arab Emirates"
              className="absolute inset-0"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm border border-red-800/50 rounded-lg p-2 sm:p-3 shadow-md text-xs sm:text-sm">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Sharjah Office</p>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Sharjah Publishing City Free Zone Sharjah,
                  </p>
                </div>
              </div>
              <div className="mt-1 sm:mt-2 text-gray-400 flex flex-col text-xs sm:text-sm">
                <a
                  href="tel:+971562930563"
                  className="flex items-center hover:text-red-500 transition-colors"
                >
                  <FaPhone className="w-3 h-3 mr-1 sm:mr-2" /> +971 56 293 0563
                </a>
                <a
                  href="mailto:sales@codenergy.ae"
                  className="flex items-center hover:text-red-500 transition-colors mt-1"
                >
                  <FaEnvelope className="w-3 h-3 mr-1 sm:mr-2" />{" "}
                  sales@codenergy.ae
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
