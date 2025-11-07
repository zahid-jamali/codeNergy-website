"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faqs");
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p className="text-gray-400 mt-4 text-lg">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-6 md:px-16 py-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <p className="text-red-600 uppercase tracking-wider font-semibold mb-3">
          Frequently Asked Questions
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          <span className="text-white">Your Questions, </span>
          <span className="text-red-600">Answered.</span>
        </h1>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          We understand your curiosity. Here’s everything you need to know about
          our process, services, and commitment to excellence.
        </p>
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-2xl lg:max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border border-red-600/50 rounded-xl bg-gray-900/30 shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-900/70 transition-all"
            >
              <div className="flex items-center gap-3">
                <FaQuestionCircle className="text-red-600 text-xl" />
                <span className="font-semibold text-lg">{faq.question}</span>
              </div>
              <motion.span
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-2xl font-bold"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="px-6 pb-6 text-gray-300 leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Still have <span className="text-red-600">questions?</span>
        </h2>
        <p className="text-gray-400 mb-8">
          Our team is always ready to help you with anything you need.
        </p>
        <a
          href="/contactus"
          className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/40"
        >
          Contact Our Support Team
        </a>
      </motion.div>
    </div>
  );
}
