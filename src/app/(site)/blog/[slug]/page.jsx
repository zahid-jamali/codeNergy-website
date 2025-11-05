"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const blogData = {
  "future-of-ai-in-software-development": {
    title: "The Future of AI in Software Development",
    author: "Aadil Khan",
    date: "Oct 25, 2025",
    image: "/blog1.jpg",
    content: `
Artificial intelligence (AI) is no longer a buzzword — it’s a revolution. From automated testing to AI-assisted code generation, developers now have tools that think, learn, and evolve.

At CodeNergy, we’re experimenting with integrating AI into our development pipelines, using it to boost productivity and uncover innovative design patterns.

AI is not replacing developers — it’s empowering them to create smarter, faster, and more reliable systems. The real future lies in human creativity powered by machine intelligence.
`,
  },
  "nextjs-15-revolution-of-fullstack-react": {
    title: "Next.js 15 — The Revolution of Full-Stack React",
    author: "Team CodeNergy",
    date: "Nov 01, 2025",
    image: "/blog2.jpg",
    content: `
Next.js 15 introduces an evolution in full-stack React development. With improved server actions, automatic caching, and even better routing, it’s becoming the go-to solution for building production-grade applications.

At CodeNergy, we’ve already migrated some client projects to Next.js 15 and noticed significant speed improvements and reduced complexity.
`,
  },
  "why-ui-ux-defines-next-gen-brands": {
    title: "Why UI/UX Defines the Next Generation of Brands",
    author: "Aadil Khan",
    date: "Oct 18, 2025",
    image: "/blog3.jpg",
    content: `
UI/UX is more than design — it’s emotion. The way users interact with your digital presence determines your brand’s credibility and trust.

At CodeNergy, every project starts with experience design, not just functionality. Because brands that connect emotionally, win digitally.
`,
  },
};

export default function BlogReadPage() {
  const { slug } = useParams();
  const blog = blogData[slug];

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-4xl text-red-600 font-bold mb-4">Blog Not Found</h1>
        <Link
          href="/blog"
          className="text-red-500 hover:text-red-400 transition underline"
        >
          Go Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-24">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-400">
          {blog.date} | {blog.author}
        </p>
      </motion.div>

      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        src={"/images/slider3.jpg"}
        alt={blog.title}
        className="w-full h-[450px] object-cover rounded-2xl mb-10 shadow-lg"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-4xl mx-auto text-gray-300 leading-relaxed whitespace-pre-line"
      >
        {blog.content}
      </motion.div>

      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-white font-semibold transition"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
