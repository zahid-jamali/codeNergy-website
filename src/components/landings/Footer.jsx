"use client";

import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black to-red-950 text-white overflow-hidden">
      {/* Subtle animated circuit background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none animate-pulse">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 300 Q 480 200, 960 300 T 1920 300"
            stroke="#ff0000"
            strokeWidth="2"
          />
          <path
            d="M0 400 Q 480 500, 960 400 T 1920 400"
            stroke="#ff0000"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="960" cy="300" r="6" fill="#ff0000" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:gap-12">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                <Image
                  src="/logo.jpeg"
                  alt="CodeNergy"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-red-500 tracking-wide">
                CodeNergy
              </h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Empowering your business through innovative software solutions.
              From custom web apps to AI integrations — we build with passion
              and precision.
            </p>

            {/* Social Media Links */}
            <div className="mt-6 flex space-x-4">
              {[
                { icon: FaFacebook, link: "#" },
                { icon: FaTwitter, link: "#" },
                { icon: FaLinkedin, link: "#" },
                { icon: FaInstagram, link: "#" },
              ].map((Social, i) => (
                <a
                  key={i}
                  href={Social.link}
                  className="p-2 bg-gray-800/50 rounded-full hover:bg-red-600 transition-all"
                >
                  <Social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-red-600 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {["About Us", "Services", "Why Choose Us", "Testimonials"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 hover:text-red-500 hover:drop-shadow-[0_0_6px_#ff0000] transition-all group"
                    >
                      <span className="w-4 h-4 mr-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        ✓
                      </span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Our Team Links */}
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-red-600 mb-6">
              Our Team
            </h4>
            <ul className="space-y-3">
              {["Our Team", "Gallery", "Latest Projects"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center text-gray-300 hover:text-red-500 hover:drop-shadow-[0_0_6px_#ff0000] transition-all group"
                  >
                    <span className="w-4 h-4 mr-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      ✓
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-red-600 mb-6">
              Contact Info
            </h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Office Address</p>
                  <p className="text-gray-300 text-sm">
                    Business Center, Sharjah Publishing City Free Zone Sharjah,
                    United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaPhone className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <a
                    href="tel:+8271234567891"
                    className="text-gray-300 hover:text-red-500 hover:drop-shadow-[0_0_6px_#ff0000] transition-all"
                  >
                    + (827) 123 - 456 - 7891
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Mail Us</p>
                  <a
                    href="mailto:sales@codenergy.ae"
                    className="text-gray-300 hover:text-red-500 hover:drop-shadow-[0_0_6px_#ff0000] transition-all"
                  >
                    sales@codenergy.ae
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-red-800/50 text-center text-gray-400 text-sm">
          <p>&copy; 2025 CodeNergy IT Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
