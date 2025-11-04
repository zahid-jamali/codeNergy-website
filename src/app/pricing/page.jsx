"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const plans = [
  {
    name: "Startup",
    price: "$299",
    features: [
      "Responsive Website (5 pages)",
      "Basic SEO Optimization",
      "Email & Chat Support",
      "Free Hosting (3 months)",
      "SSL Security Included",
    ],
  },
  {
    name: "Growth",
    price: "$699",
    featured: true,
    features: [
      "Custom Web or App Design",
      "Advanced SEO & Analytics",
      "Priority 24/7 Support",
      "Free Hosting (6 months)",
      "Deployment & Maintenance",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Fully Custom Enterprise Solutions",
      "Dedicated Project Manager",
      "Advanced Security Integration",
      "Performance Optimization",
      "Ongoing Partnership & Scaling",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="relative bg-black text-white py-20 px-6 overflow-hidden">
      {/* Futuristic background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-black"></div>
      <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-red-500 uppercase font-semibold tracking-widest mb-4"
        >
          Pricing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold"
        >
          <span className="text-white">Choose Your </span>
          <span className="text-red-600">CodeNergy Plan</span>
        </motion.h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Powering your ideas with innovation, design, and performance. Pick a
          plan that matches your vision and scale it effortlessly.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl p-8 backdrop-blur-xl border transition-all duration-500 ${
              plan.featured
                ? "bg-red-600/10 border-red-500 shadow-lg shadow-red-600/40 scale-105"
                : "bg-white/5 border-gray-700 hover:border-red-500 hover:shadow-lg hover:shadow-red-600/30"
            }`}
          >
            {plan.featured && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                Popular
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-4xl font-extrabold text-red-500 mb-6">
              {plan.price}
              {plan.price !== "Custom" && (
                <span className="text-gray-400 text-base font-medium">
                  {" "}
                  / project
                </span>
              )}
            </p>

            <ul className="text-left space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <FaCheckCircle className="text-red-500 mt-1 mr-2" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                plan.featured
                  ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/50"
                  : "border border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
              }`}
            >
              {plan.price === "Custom" ? "Contact Us" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mt-20"
      >
        <h3 className="text-2xl font-semibold text-white mb-4">
          Need a Custom Solution?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Whether you're building an AI platform, eCommerce store, or enterprise
          system — CodeNergy will tailor a plan that fits your exact needs.
        </p>
        <Link
          href="/contactus"
          className="inline-block bg-red-600 text-white font-semibold py-3 px-10 rounded-lg hover:bg-red-500 transition-all duration-300 shadow-lg shadow-red-600/40"
        >
          Talk to Our Team
        </Link>
      </motion.div>
    </section>
  );
};

export default Pricing;
