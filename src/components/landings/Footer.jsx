"use client";

import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black to-red-950 text-white overflow-hidden">
      {/* Subtle circuit background for consistency */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
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

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16  rounded-lg flex items-center justify-center mr-3">
                {/* Simple SVG logo - circuit "R" */}
                <Image
                  src={"/logo.jpeg"}
                  alt={"codeNergy"}
                  width={100}
                  height={100}
                />
              </div>
              <div></div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vel ornare odio, eget sagittis nisl. Nullam vulputate risus ut
              nisi mollis.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-red-800/50 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-white placeholder-gray-500 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="sm:w-auto inline-flex items-center justify-center bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-red-600 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {["About Us", "Service", "Why Choose Us", "Testimonials"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 hover:text-red-500 transition-colors group"
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
            <h4 className="text-xl sm:text-2xl font-bold text-red-600 mb-6">
              Our Team
            </h4>
            <ul className="space-y-3">
              {["Our Team", "Gallery", "Newest"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center text-gray-300 hover:text-red-500 transition-colors group"
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
            <h4 className="text-xl sm:text-2xl font-bold text-red-600 mb-6">
              Contact Info
            </h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold">Office Address</p>
                  <p className="text-gray-300 text-sm">
                    Business Center, Sharjah Publishing City Free Zone Sharjah,
                    United Arab Emirates
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaPhone className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-bold">Call Us</p>
                  <a
                    href="tel:+8271234567891"
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    + (827) 123 - 456 - 7891
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-bold">Mail Us</p>
                  <a
                    href="mailto:sales@codenergy.ae"
                    className="text-gray-300 hover:text-red-500 transition-colors"
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
          <p>&copy; 2025 codeNergy IT Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
