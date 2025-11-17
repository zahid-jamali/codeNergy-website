"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CareersPage() {
  const perks = [
    {
      title: "Innovative Environment",
      desc: "At CodeNergy, creativity and innovation are at the heart of everything we do. Team members are encouraged to experiment, propose new ideas, and shape the future of technology with real impact.",
    },
    {
      title: "Professional Growth",
      desc: "We provide structured mentorship programs, workshops, and learning resources. Our goal is to ensure every team member continually grows their skills, gains exposure to new technologies, and reaches their full potential.",
    },
    {
      title: "Collaborative Culture",
      desc: "We believe in teamwork and collaboration. Daily stand-ups, brainstorming sessions, and cross-team projects ensure that every voice is heard and that together we achieve excellence.",
    },
    {
      title: "Flexibility & Well-being",
      desc: "Work-life balance is key. Flexible working hours, remote work options, and wellness programs are available to ensure our team is productive, happy, and energized.",
    },
    {
      title: "Exciting Projects",
      desc: "From innovative startup solutions to large enterprise systems, our projects challenge team members to push boundaries and develop cutting-edge software that makes a difference.",
    },
  ];

  const positions = [
    {
      title: "Frontend Developer",
      desc: "We are looking for a passionate Frontend Developer proficient in React, Next.js, and modern UI/UX practices. You will build scalable web applications and work closely with designers and backend engineers.",
    },
    {
      title: "Backend Developer",
      desc: "Join our backend team to design robust APIs, manage databases, and ensure system scalability. Proficiency in Node.js, Express, and database systems (MongoDB/PostgreSQL) is required.",
    },
    {
      title: "Full-Stack Developer",
      desc: "Full-stack engineers at CodeNergy develop end-to-end solutions. You should have experience in MERN stack, understanding frontend and backend integration, and deploying cloud-ready applications.",
    },
    {
      title: "UI/UX Designer",
      desc: "Bring designs to life! Work on wireframes, prototypes, and collaborate with developers to ensure seamless user experiences across web and mobile platforms.",
    },
  ];

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Careers at <span className="text-red-500">CodeNergy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Join a team where innovation meets passion. At CodeNergy, we believe
          in creating an environment that nurtures growth, fosters creativity,
          and delivers impactful solutions. Explore life at CodeNergy and find
          the perfect role for you.
        </motion.p>

        <Image
          src={"/images/team.jpg"}
          width={600}
          height={300}
          alt="Team"
          className="m-auto pt-4 md:pt-12"
        />
      </div>

      {/* Life at CodeNergy */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 ">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-red-500 mb-12 text-center"
        >
          Life at CodeNergy
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {perks.map((perk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 hover:border-red-500 transition-all duration-500 shadow-lg shadow-red-600/20"
            >
              <h3 className="text-2xl font-bold mb-3">{perk.title}</h3>
              <p className="text-gray-300">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Openings */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 bg-gray-900/20 rounded-3xl border border-gray-800 shadow-lg">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-red-500 mb-12 text-center"
        >
          Current Openings
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {positions.map((pos, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 hover:border-red-500 transition-all duration-500 shadow-lg shadow-red-600/20"
            >
              <h3 className="text-2xl font-bold mb-3">{pos.title}</h3>
              <p className="text-gray-300">{pos.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Apply Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 mt-24 bg-black/50 backdrop-blur-2xl rounded-3xl border border-gray-700 shadow-lg shadow-red-600/20">
        <h2 className="text-4xl font-bold text-red-500 mb-6 text-center">
          Apply Now
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          If you see a position that excites you, or want to be part of our
          growing team, fill out the form below and we will get back to you
          promptly.
        </p>
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
          />
          {/* <input
            type="text"
            placeholder="Position Applying For"
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
          /> */}
          <select className="">
            {positions.map((P) => (
              <option className="bg-black text-white hover:bg-red-500 text-black ">
                {P.title}
              </option>
            ))}
          </select>
          <textarea
            rows={6}
            placeholder="Tell us about yourself, experience, and motivation..."
            className="w-full px-5 py-4 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-red-500 outline-none"
          ></textarea>
          <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-all duration-300 shadow-md shadow-red-600/40">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}
