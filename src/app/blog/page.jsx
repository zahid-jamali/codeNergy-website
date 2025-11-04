"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "The Future of AI in Software Development",
    date: "Oct 25, 2025",
    author: "Aadil Khan",
    description:
      "Discover how artificial intelligence is reshaping how software is written, tested, and deployed across industries.",
    image: "/blog1.jpg",
    slug: "future-of-ai-in-software-development",
  },
  {
    title: "Next.js 15 — The Revolution of Full-Stack React",
    date: "Nov 01, 2025",
    author: "Team CodeNergy",
    description:
      "A deep dive into Next.js 15 new app router, streaming features, and why it's the future of React development.",
    image: "/blog2.jpg",
    slug: "nextjs-15-revolution-of-fullstack-react",
  },
  {
    title: "Why UI/UX Defines the Next Generation of Brands",
    date: "Oct 18, 2025",
    author: "Aadil Khan",
    description:
      "Your design isn’t just aesthetics — it’s the emotion that defines how users connect with your brand.",
    image: "/blog3.jpg",
    slug: "why-ui-ux-defines-next-gen-brands",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-24">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-red-600 mb-4"
        >
          Our Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Insights, innovations, and ideas shaping the digital future by
          CodeNergy.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-600/40 transition-all"
          >
            <div className="overflow-hidden">
              <motion.img
                src={"/images/slider3.jpg"}
                alt={blog.title}
                className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {blog.date} | {blog.author}
              </p>
              <p className="text-gray-300 mb-6">{blog.description}</p>
              <Link
                href={`/blog/${blog.slug}`}
                className="inline-block text-red-600 border border-red-600 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
