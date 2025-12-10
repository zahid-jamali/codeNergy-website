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
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [time, setTime] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);
  const [mobileExpandedSubcategory, setMobileExpandedSubcategory] =
    useState(null);
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    fetch("/api/services/forNavbar")
      .then((res) => res.json())
      .then((data) => setServiceCategories(data));
  }, []);

  useEffect(() => {
    console.log(serviceCategories);
  }, [serviceCategories]);

  // Service categories structure
  // const serviceCategories = {
  //   development: {
  //     title: "Development",
  //     href: "/development",
  //     subcategories: {
  //       website: {
  //         title: "Website Development",
  //         services: [
  //           { name: "E-Commerce Websites", href: "/services/ecommerce" },
  //           { name: "Portfolio Websites", href: "/services/portfolio" },
  //         ],
  //       },
  //       app: {
  //         title: "App Development",
  //         services: [
  //           { name: "Android Development", href: "/services/android" },
  //         ],
  //       },
  //       software: {
  //         title: "Software Development",
  //         services: [
  //           { name: "CMS Software", href: "/services/cms" },
  //           { name: "ERP Software", href: "/services/erp" },
  //         ],
  //       },
  //     },
  //   },
  //   marketing: {
  //     title: "Marketing & Branding",
  //     href: "/marketing",
  //     subcategories: {
  //       digital: {
  //         title: "Digital Marketing",
  //         services: [
  //           { name: "SEO Services", href: "/services/seo" },
  //           { name: "Social Media Marketing", href: "/services/smm" },
  //         ],
  //       },
  //       content: {
  //         title: "Content Marketing",
  //         services: [
  //           { name: "Content Strategy", href: "/services/content-strategy" },
  //           { name: "Copywriting", href: "/services/copywriting" },
  //         ],
  //       },
  //       branding: {
  //         title: "Brand Identity",
  //         services: [
  //           { name: "Logo Design", href: "/services/logo" },
  //           { name: "Brand Guidelines", href: "/services/brand-guidelines" },
  //         ],
  //       },
  //     },
  //   },
  //   outsourcing: {
  //     title: "Outsourcing Services",
  //     href: "/outsourcing",
  //     subcategories: {
  //       staff: {
  //         title: "Staff Augmentation",
  //         services: [
  //           { name: "Dedicated Developers", href: "/services/dedicated-dev" },
  //           { name: "Project Teams", href: "/services/project-teams" },
  //         ],
  //       },
  //       support: {
  //         title: "Business Support",
  //         services: [
  //           { name: "Virtual Assistants", href: "/services/virtual-assistant" },
  //           { name: "Data Entry", href: "/services/data-entry" },
  //         ],
  //       },
  //     },
  //   },
  //   technical: {
  //     title: "Technical Support Services",
  //     href: "/technicalSupport",
  //     subcategories: {
  //       maintenance: {
  //         title: "Website Maintenance",
  //         services: [
  //           { name: "Regular Updates", href: "/services/updates" },
  //           { name: "Bug Fixes", href: "/services/bug-fixes" },
  //         ],
  //       },
  //       hosting: {
  //         title: "Hosting Support",
  //         services: [
  //           { name: "Server Management", href: "/services/server" },
  //           { name: "Cloud Solutions", href: "/services/cloud" },
  //         ],
  //       },
  //     },
  //   },
  // };

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-AE", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("main-navbar");
      if (!navbar) return;

      const navbarOffset = navbar.offsetTop;
      setIsSticky(window.scrollY > navbarOffset);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="flex flex-col relative">
        {/* --------- Header (Mobile) --------- */}
        <div className="flex justify-center items-center gap-6 text-2xl bg-red-600 text-white h-28 lg:hidden">
          <a
            href="https://www.facebook.com/profile.php?id=61583738717575"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:text-blue-400 transition" />
          </a>
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
                  className="hover:text-gray-200"
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
                    className="border-2 rounded-sm shadow-md"
                  />
                  <span className="pl-3">Current Time (UAE): {time}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-5 text-2xl">
            <a
              href="https://www.facebook.com/profile.php?id=61583738717575"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* --------- Navbar --------- */}
        <div
          id="main-navbar"
          className={`bg-black w-full flex items-center justify-between px-5 md:px-16 py-2 transition-all duration-300
      ${isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-2xl" : "relative"}`}
        >
          {/* Logo */}
          <div className="w-1/3 md:w-auto">
            <Image
              src="/logo.jpeg"
              alt="CodeNergy"
              width={400}
              height={400}
              className="w-full h-full max-h-30 object-contain"
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

            <div
              className="relative group z-50"
              onMouseEnter={() => setDropdownOpen("pages")}
              onMouseLeave={() => {
                setDropdownOpen(null);
                setActiveSubcategory(null);
                setActiveService(null);
              }}
            >
              <button className="flex items-center gap-1 hover:text-red-500 transition">
                What we do
              </button>

              {dropdownOpen === "pages" && (
                <div className="absolute top-full left-0 flex z-[9999]">
                  {/* Main Categories */}
                  <div
                    className="bg-black  rounded shadow-lg flex flex-col min-w-[180px]"
                    style={{
                      backgroundColor: "rgba(0,0,0,1)",
                      isolation: "isolate",
                    }}
                  >
                    {Object.entries(serviceCategories).map(
                      ([key, category]) => (
                        <div
                          key={key}
                          onMouseEnter={() => {
                            setActiveSubcategory(key);
                            setActiveService(null);
                          }}
                          className="relative"
                        >
                          <Link
                            href={category.href}
                            className="px-4 py-2 text-white hover:bg-red-500 hover:text-white transition flex items-center justify-between"
                          >
                            <span>{category.title}</span>
                            <span className="ml-2">›</span>
                          </Link>
                        </div>
                      )
                    )}
                  </div>

                  {/* Subcategories and Services in One Box */}
                  {activeSubcategory && (
                    <div
                      className="bg-black  rounded shadow-lg min-w-[200px] max-w-[350px] ml-0 max-h-[500px] overflow-y-auto"
                      style={{
                        backgroundColor: "rgba(0,0,0,1)",
                        isolation: "isolate",
                      }}
                    >
                      {Object.entries(
                        serviceCategories[activeSubcategory].subcategories
                      ).map(([subKey, subcategory]) => (
                        <div
                          key={subKey}
                          onMouseEnter={() => setActiveService(subKey)}
                          onMouseLeave={() => setActiveService(null)}
                          className="border-b border-gray-800 last:border-b-0"
                        >
                          {/* Subcategory Title */}
                          <div className="px-4 py-3 text-base text-red-400 font-semibold bg-gray-900 cursor-pointer hover:bg-red-500 hover:text-white transition">
                            {subcategory.title}
                          </div>

                          {/* Services appear under subcategory when hovered */}
                          {activeService === subKey && (
                            <div className="flex flex-col bg-gray-950">
                              {subcategory.services.map((service, idx) => (
                                <Link
                                  key={idx}
                                  href={service.href}
                                  className="px-6 py-2 text-gray-300 hover:bg-red-500 hover:text-white transition text-base border-l-2 border-red-600"
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/ourphilosophy"
              className="hover:text-red-500 transition"
            >
              How we do it
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

                  {/* Home */}
                  <div className="flex flex-col text-white">
                    <Link href={"/"}>
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between w-full pr-6 hover:text-red-600 transition"
                      >
                        Home
                      </button>
                    </Link>
                  </div>

                  <Link
                    href="/aboutus"
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-red-600 transition"
                  >
                    <button>Who we are</button>
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
                      What we do
                      <span className="text-xl">
                        {dropdownOpen === "pages" ? "−" : "+"}
                      </span>
                    </button>
                    {dropdownOpen === "pages" && (
                      <div className="flex flex-col ml-4 mt-2 space-y-3">
                        {Object.entries(serviceCategories).map(
                          ([key, category]) => (
                            <div key={key}>
                              {/* Main Category */}
                              <button
                                onClick={() =>
                                  setMobileExpandedCategory(
                                    mobileExpandedCategory === key ? null : key
                                  )
                                }
                                className="flex items-center justify-between w-full text-red-500 hover:text-white transition font-semibold"
                              >
                                <span className="hover:text-white">
                                  {category.title}
                                </span>
                                <span className="text-lg ml-2">
                                  {mobileExpandedCategory === key ? "−" : "+"}
                                </span>
                              </button>

                              {/* Subcategories */}
                              {mobileExpandedCategory === key && (
                                <div className="ml-4 mt-2 space-y-2">
                                  {Object.entries(category.subcategories).map(
                                    ([subKey, subcategory]) => (
                                      <div key={subKey}>
                                        <button
                                          onClick={() =>
                                            setMobileExpandedSubcategory(
                                              mobileExpandedSubcategory ===
                                                `${key}-${subKey}`
                                                ? null
                                                : `${key}-${subKey}`
                                            )
                                          }
                                          className="flex items-center justify-between w-full text-gray-300 hover:text-white transition text-sm font-medium"
                                        >
                                          <span>{subcategory.title}</span>
                                          <span className="text-base ml-2">
                                            {mobileExpandedSubcategory ===
                                            `${key}-${subKey}`
                                              ? "−"
                                              : "+"}
                                          </span>
                                        </button>

                                        {/* Services */}
                                        {mobileExpandedSubcategory ===
                                          `${key}-${subKey}` && (
                                          <div className="ml-4 mt-1 space-y-1">
                                            {subcategory.services.map(
                                              (service, idx) => (
                                                <Link
                                                  key={idx}
                                                  href={service.href}
                                                >
                                                  <button
                                                    className="text-gray-400 text-xs hover:text-red-500 transition block w-full text-left py-1"
                                                    onClick={() =>
                                                      setMenuOpen(false)
                                                    }
                                                  >
                                                    • {service.name}
                                                  </button>
                                                </Link>
                                              )
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/ourphilosophy"
                    className="text-white hover:text-red-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <button>How we do it</button>
                  </Link>

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

        {/* Spacer to prevent content jump when navbar becomes fixed */}
        {isSticky && <div style={{ height: "70px" }}></div>}
      </div>
    </>
  );
};

export default Navbar;
