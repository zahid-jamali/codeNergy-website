"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contactus = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("contact-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="contact-section"
      className="w-full bg-[url('/images/slider2.jpg')] bg-cover bg-center relative overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="text-left mb-12">
          <p className="text-red-600 text-sm sm:text-base font-semibold tracking-wider uppercase inline-flex items-center">
            <span className="inline-block w-12 h-px bg-red-600 mr-3"></span>
            Contact Us
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Get In </span>
            <span className="text-red-600">Touch</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-white"
          >
            <h3 className="text-2xl font-semibold text-red-500">
              Feel Free to Contact Us
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We’d love to hear from you! Whether you have a question about
              features, pricing, or anything else, our team is ready to answer
              all your questions.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-red-500 mr-3" />
                <p>+92 300 1234567</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-red-500 mr-3" />
                <p>info@zarehtechsolutions.com</p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-3" />
                <p>Nawabshah, Sindh, Pakistan</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <form className="space-y-6">
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
                  className="w-full px-4 py-3 bg-gray-900/60 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="John Doe"
                  required
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
                  className="w-full px-4 py-3 bg-gray-900/60 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-medium mb-2"
                >
                  Your Message (optional)
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-red-600 text-white font-bold py-4 px-12 rounded-lg hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
              >
                Send Message
                <FaPaperPlane className="w-5 h-5 ml-2" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="w-full h-80 border-2 border-red-600 rounded-lg overflow-hidden shadow-lg shadow-red-500/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.668316365456!2d-0.127758384316!3d51.503441179636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900000000%3A0x7b5e3c8f00b6a3d!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1698765432100!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location - London Eye"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contactus;
