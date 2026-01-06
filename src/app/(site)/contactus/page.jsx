"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contactus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [msg, setMsg] = useState({ text: null, type: null });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message === ""
    ) {
      return alert("Please fill all the fields");
    }
    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setMsg({ text: "Successfully done", type: "success" });
      setLoading(false);
    } else {
      setMsg({ text: "An error occured!", type: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("contact-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) {
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
                <FaPhone className="text-red-500 mr-3 rotate-90" />

                <a href="tel:+971562930563">
                  <p>+971 56 293 0563</p>
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-red-500 mr-3" />
                <a
                  href="mailto:sales@codenergy.ae"
                  className="flex items-center hover:text-red-500 transition-colors mt-1"
                >
                  {" "}
                  sales@codenergy.ae
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-3" />
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/XmQbrSpujhi4vSZa7"
                >
                  <p className="hover:text-red-500">
                    Sharjah Publishing City Free Zone Sharjah, UAE
                  </p>
                </a>
              </div>

              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-3 " />
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/WdpBk9rS7kJtfutz5"
                >
                  <p className="hover:text-red-500">
                    47-C, Mezz Floor, DHA Phase II Ext, Karachi
                  </p>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={handleChange}
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
                  name="email"
                  onChange={handleChange}
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
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900/60 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <AnimatePresence>
                {msg.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`text-center font-semibold px-4 py-3 rounded-lg shadow-md ${
                      msg.type === "success"
                        ? "bg-green-600/20 text-green-400 border border-green-600/50"
                        : "bg-red-600/20 text-red-400 border border-red-600/50"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto inline-flex items-center justify-center font-bold py-4 px-12 rounded-lg transition-all duration-300 shadow-lg 
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed text-white"
              : "bg-red-600 hover:bg-red-500 hover:shadow-red-500/50 text-white"
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
            </form>
          </motion.div>
        </div>
        <div className="w-4/5 h-80 mt-16 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* ================= Head Office ================= */}
            <motion.div
              className="relative h-64 sm:h-80 md:h-96 lg:h-full p-3 sm:p-4 pt-10 rounded-xl overflow-hidden shadow-2xl border border-red-800/50"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {/* Heading */}
              <h2 className="absolute top-3 left-4 z-10 text-white text-xl font-semibold bg-black/60 px-3 py-1 rounded-md">
                Head Office
              </h2>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.427420517524!2d55.45602357414213!3d25.319909077632165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f26195b7e6b%3A0xc0f6d4eb509bdf75!2sSPC%20Free%20Zone%20-%20Business%20Setup%20In%20Sharjah%2C%20UAE!5e1!3m2!1sen!2s!4v1764577804696!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="Sharjah Office"
              />

              {/* Info Box */}
              <div className="absolute bottom-4 left-4 z-10 bg-gray-900/40 backdrop-blur-sm border border-red-800/50 rounded-lg p-3 shadow-md text-sm">
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-red-500 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Head Office</p>
                    <p className="text-gray-300">
                      Sharjah Publishing City Free Zone, UAE
                    </p>
                  </div>
                </div>

                <div className="mt-2 text-gray-400 flex flex-col">
                  <a
                    href="tel:+971562930563"
                    className="flex items-center hover:text-red-500"
                  >
                    <FaPhone className="mr-2" /> +971 56 293 0563
                  </a>
                  <a
                    href="mailto:sales@codenergy.ae"
                    className="flex items-center hover:text-red-500 mt-1"
                  >
                    <FaEnvelope className="mr-2" /> sales@codenergy.ae
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ================= Pakistan Branch ================= */}
            <motion.div
              className="relative h-64 sm:h-80 md:h-96 lg:h-full p-3 sm:p-4 pt-10 rounded-xl overflow-hidden shadow-2xl border border-green-800/50"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              {/* Heading */}
              <h2 className="absolute top-3 left-4 z-10 text-white text-xl font-semibold bg-black/60 px-3 py-1 rounded-md">
                Pakistan Branch
              </h2>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1022.0382655611436!2d67.07052593322841!3d24.83236730298221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1767700698039!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="Pakistan Office"
              />

              {/* Info Box */}
              <div className="absolute bottom-4 left-4 z-10 bg-gray-900/40 backdrop-blur-sm border border-green-800/50 rounded-lg p-3 shadow-md text-sm">
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-green-500 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Pakistan Office</p>
                    <p className="text-gray-300">
                      47-C, Mezz Floor, DHA Phase II Ext, Karachi
                    </p>
                  </div>
                </div>

                <div className="mt-2 text-gray-400 flex flex-col">
                  <a
                    href="tel:+923378328310"
                    className="flex items-center hover:text-green-500"
                  >
                    <FaPhone className="mr-2" /> 0337-8328310
                  </a>

                  <a
                    href="mailto:sales@codenergy.ae"
                    className="flex items-center hover:text-green-500 mt-1"
                  >
                    <FaEnvelope className="mr-2" /> sales@codenergy.ae
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
