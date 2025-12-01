"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [time, setTime] = useState("");
  const [isSticky, setIsSticky] = useState(false);

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

  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    const sentinel = document.getElementById("sticky-sentinel");

    if (!navbar || !sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="flex flex-col ">
        {/* --------- Header (Mobile) --------- */}
        <div className="flex justify-center  items-center gap-6 text-2xl bg-red-600 text-white h-28 lg:hidden">
          <FaFacebook className="hover:text-blue-400 transition" />
          <FaTwitter className="hover:text-sky-300 transition" />
          <FaYoutube className="hover:text-red-400 transition" />
        </div>

        {/* --------- Desktop Header --------- */}
        <div className="hidden lg:flex justify-between text-white bg-red-600 items-center px-16 py-4">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <SiGmail className="text-white" />
                <a
                  href="mailto:sales@codenergy.ae"
                  className=" hover:text-gray-200"
                >
                  sales@codenergy.ae
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex flex-row">
                  <Image
                    src={"/images/ae.png"}
                    alt="UAE Flag"
                    width={30}
                    height={7}
                    className=" border-2rounded-sm shadow-md"
                  />

                  <span className="pl-3">Current Time (UAE): {time}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-5 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* --------- Navbar --------- */}
        <div id="sticky-sentinel" className="h-1"></div>

        <div
          id="main-navbar"
          className={`bg-black w-full flex items-center justify-between px-5 md:px-16 py-1 relative transition-all duration-300
  ${isSticky ? "fixed top-0 left-0 z-50 shadow-xl" : ""}`}
        >
          {/* Logo */}
          <div className="w-1/3 md:w-auto    ">
            <Image
              src="/logo.jpeg"
              alt="CodeNergy"
              width={400}
              height={400}
              className="w-full h-full max-h-30 object-contain "
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-white text-lg">
            <div className="relative group">
              <Link href={"/"}>
                <button className="flex items-center gap-1 hover:text-red-500 transition">
                  Home
                </button>
              </Link>
            </div>

            <Link href="/aboutus" className="hover:text-red-500 transition">
              Who we are
            </Link>

            <Link href="/services" className="hover:text-red-500 transition">
              What we do
            </Link>
            <Link
              href="/ourphilosophy"
              className="hover:text-red-500 transition"
            >
              How we do it
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
                  {/* <Link
                    href="#"
                    className=" disable px-4 py-2 text-white hover:bg-red-300 hover:text-white transition"
                    // disable={true}
                  >
                    <i>Portfolio</i>
                  </Link> */}
                  <Link
                    href="/pricing"
                    className="px-4 py-2 text-white hover:bg-red-500 hover:text-white transition"
                  >
                    Pricing
                  </Link>
                  {/* <Link
                    href="/blog"
                    className="px-4 py-2 text-white hover:bg-red-300 hover:text-white transition"
                  >
                    <i>Blogs</i>
                  </Link> */}
                  <Link
                    href="/faq"
                    className="px-4 py-2 text-white hover:bg-red-500 hover:text-white transition"
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>

            {/* <Link href="/team" className="hover:text-red-500 transition">
              Team
            </Link> */}
            <Link
              href="/contactus"
              className="bg-red-600 border-2 border-black text-white px-6 py-3 rounded-none hover:bg-black hover:text-white hover:border-2 hover:border-red-600 transition"
            >
              Contact Us
            </Link>
          </div>
          {/* <div className="hidden md:block">
          </div> */}

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

                  <Link
                    href="/aboutus"
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-red-600 transition"
                  >
                    <button>Who we are</button>
                  </Link>

                  <Link
                    href="/services"
                    className="text-white hover:text-red-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <button>What we do</button>
                  </Link>

                  <Link
                    href="/ourphilosophy"
                    className="text-white hover:text-red-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <button>How we do it</button>
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
                        {/* <button
                          disabled
                          className="opacity-50 cursor-not-allowed"
                        >
                          Portfolio (Coming Soon)
                        </button> */}

                        <Link href="/pricing">
                          <button
                            className="hover:text-white transition"
                            onClick={() => setMenuOpen(false)}
                          >
                            Pricing
                          </button>
                        </Link>

                        {/* <button
                          disabled
                          className="opacity-50 cursor-not-allowed"
                        >
                          Blogs (Coming Soon)
                        </button> */}

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
                    href="/contactus"
                    onClick={() => setMenuOpen(false)}
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
