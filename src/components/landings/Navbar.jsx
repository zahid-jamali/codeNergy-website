"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaClock,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      // Format the time in UAE timezone (Gulf Standard Time)
      const formatted = now.toLocaleString("en-AE", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    update(); // Run once
    const interval = setInterval(update, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen">
        {/* --------- Header (Mobile) --------- */}
        <div className="flex justify-center items-center gap-6 text-2xl bg-red-600 text-white h-28 lg:hidden">
          <FaFacebook className="hover:text-blue-400 transition" />
          <FaTwitter className="hover:text-sky-300 transition" />
          <FaYoutube className="hover:text-red-400 transition" />
        </div>

        {/* --------- Desktop Header --------- */}
        <div className="hidden lg:flex justify-between text-white bg-red-600 items-center px-16 py-4">
          <div className="flex flex-col gap-2 text-sm">
            {/* <div className="flex items-center gap-2">
              <FaLocationDot className="text-white" />
              <span>
                Business Center, Sharjah Publishing City Free Zone, Sharjah, UAE
              </span>
            </div> */}

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <SiGmail className="text-white" />
                <a
                  href="mailto:sales@codenergy.ae"
                  className="hover:underline hover:text-gray-200"
                >
                  sales@codenergy.ae
                </a>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-white" />
                <span className="flex flex-row">
                  <Image
                    src={"/images/ae.png"}
                    alt="UAE Flag"
                    width={25}
                    height={7}
                    className=" border-2rounded-sm shadow-md"
                  />{" "}
                  {"          "}
                  Current Time (UAE): {time}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-5 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-300 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* --------- Navbar --------- */}
        <div className="bg-black w-full flex items-center justify-between px-6 md:px-16 py-1 relative">
          {/* Logo */}
          <div className="  w-1/3 md:w-1/9  ">
            <Image
              src="/logo.jpeg"
              alt="CodeNergy"
              width={400}
              height={400}
              className="w-full h-auto max-h-30 object-contain "
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-white text-lg">
            <div
              className="relative group"
              // onMouseEnter={() => setDropdownOpen("home")}
              // onMouseLeave={() => setDropdownOpen(null)}
            >
              <Link href={"/"}>
                <button className="flex items-center gap-1 hover:text-red-500 transition">
                  Home
                </button>
              </Link>
              {/* {dropdownOpen === "home" && (
                <div className="absolute top-full mt-2 left-0 bg-black border border-red-500 rounded shadow-lg flex flex-col min-w-[160px]">
                  <a
                    href="#"
                    className="px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    Home Style 1
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    Home Style 2
                  </a>
                </div>
              )} */}
            </div>

            <Link href="/aboutus" className="hover:text-red-500 transition">
              About Us
            </Link>

            <Link href="/services" className="hover:text-red-500 transition">
              Services
            </Link>

            <div
              className="relative group z-50"
              onMouseEnter={() => setDropdownOpen("pages")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button className="flex items-center gap-1 hover:text-red-500 transition">
                Solutions +
              </button>

              {dropdownOpen === "pages" && (
                <div
                  onMouseEnter={() => setDropdownOpen("pages")} // keeps dropdown open
                  onMouseLeave={() => setDropdownOpen(null)} // closes only when leaving dropdown
                  className="absolute top-full left-0 bg-black border border-red-500 rounded shadow-lg flex flex-col min-w-[180px] z-[9999]"
                  style={{
                    backgroundColor: "rgba(0,0,0,1)",
                    isolation: "isolate",
                  }}
                >
                  <Link
                    href="/portfolio"
                    className="px-4 py-2 text-white hover:bg-red-500 hover:text-white transition"
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-4 py-2 text-white hover:bg-red-500 hover:text-white transition"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/blog"
                    className="px-4 py-2 text-white hover:bg-red-500 hover:text-white transition"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/faq"
                    className="px-4 py-2 text-white hover:bg-red-500 hover:text-white transition"
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>

            <Link href="/team" className="hover:text-red-500 transition">
              Team
            </Link>

            <Link
              href="/contactus"
              className="bg-red-600 border-2 border-black text-white px-6 py-3 rounded-none hover:bg-black hover:text-white hover:border-2 hover:border-red-600 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Toggle Button (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl md:hidden focus:outline-none z-50"
          >
            {menuOpen ? <FaTimes className="text-red-600" /> : <FaBars />}
          </button>

          {/* Animated Mobile Menu + Overlay */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 0.5, x: 0 }}
                  exit={{ opacity: 0, x: "-100%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="fixed inset-0 bg-black md:hidden z-30"
                  onClick={() => setMenuOpen(false)}
                />

                {/* Sliding Navbar */}
                {/* Sliding Navbar (Mobile) */}
                <motion.div
                  key="mobile-menu"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="fixed top-10 left-0 w-3/4 h-full bg-black flex flex-col text-left pl-6 text-lg space-y-6 py-16 md:hidden z-40 overflow-y-auto"
                >
                  <Image
                    src={"/logo.jpeg"}
                    alt={"codeNergy"}
                    width={50}
                    height={50}
                  />

                  {/* Home Dropdown */}
                  <div className="flex flex-col text-white">
                    <Link href={"/"}>
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between w-full pr-6 hover:text-red-600 transition"
                      >
                        Home
                      </button>
                    </Link>
                    {/* {dropdownOpen === "home" && (
                      <div className="flex flex-col ml-4 mt-2 space-y-2 text-red-500">
                        <a href="#" className="hover:text-white transition">
                          Home Style 1
                        </a>
                        <a href="#" className="hover:text-white transition">
                          Home Style 2
                        </a>
                      </div>
                    )} */}
                  </div>

                  <Link href="/aboutus">
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="text-white hover:text-red-600 transition"
                    >
                      About Us
                    </button>
                  </Link>

                  <Link href="/services">
                    <button
                      className="text-white hover:text-red-600 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Services
                    </button>
                  </Link>

                  {/* Pages Dropdown */}
                  <div className="flex flex-col text-white">
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === "pages" ? null : "pages"
                        )
                      }
                      className="flex items-center justify-between w-full pr-6 hover:text-red-600 transition"
                    >
                      Solutions +
                    </button>
                    {dropdownOpen === "pages" && (
                      <div className="flex flex-col ml-4 mt-2 space-y-2 text-red-500">
                        <Link href="/portfolio">
                          <button
                            className="hover:text-white transition"
                            onClick={() => setMenuOpen(false)}
                          >
                            Portfolio
                          </button>
                        </Link>
                        <Link href="/pricing">
                          <button
                            className="hover:text-white transition"
                            onClick={() => setMenuOpen(false)}
                          >
                            Pricing
                          </button>
                        </Link>
                        <Link href="/blog">
                          <button
                            className="hover:text-white transition"
                            onClick={() => setMenuOpen(false)}
                          >
                            Blogs
                          </button>
                        </Link>
                        <Link href="/faq">
                          <button
                            className="hover:text-white transition"
                            onClick={() => setMenuOpen(false)}
                          >
                            FAQ
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/team"
                    className="text-white hover:text-red-600 transition"
                  >
                    <button onClick={() => setMenuOpen(false)}>Team</button>
                  </Link>

                  <Link
                    href="/contactus"
                    className="bg-red-600 text-white px-6 py-3 hover:bg-black hover:border-2 hover:border-red-600 hover:text-white transition rounded-none"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Navbar;
