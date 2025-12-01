"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HowWeDoItPage() {
  const sections = [
    {
      title: "We Listen Before We Build",
      points: [
        "We don’t jump into development or marketing blindly.",
        "Our first step is always deep understanding:",
        "Your business model",
        "Your audience",
        "Your challenges",
        "Your long-term vision",
        "This clarity helps us design solutions that actually matter.",
      ],
      image: "/images/section1.jpg",
    },
    {
      title: "We Create with Purpose",
      points: [
        "Every line of code, every design, every campaign — has a purpose, strategy, and result attached to it.",
        "We don’t do generic work.",
        "We build what brings value, reduces effort, boosts revenue, and makes your brand stronger.",
      ],
      image: "/images/section2.jpg",
    },
    {
      title: "We Mix Creativity with Technology",
      points: [
        "We combine:",
        "Modern technologies",
        "Smart automation",
        "Human creativity",
        "Data-driven decision-making",
        "This blend ensures your digital presence is not only functional — it’s powerful, scalable, and future-ready.",
      ],
      image: "/images/section3.jpg",
    },
    {
      title: "We Move Fast, But Never Compromise Quality",
      points: [
        "Speed matters.",
        "Quality matters even more.",
        "CodeNergy follows a structured, agile workflow that ensures:",
        "Rapid development",
        "On-time delivery",
        "Zero compromise on performance",
        "Continuous improvements",
        "We keep progress visible and communication clear — always.",
      ],
      image: "/images/section4.jpg",
    },
    {
      title: "We Believe in Transparency & Trust",
      points: [
        "No hidden costs.",
        "No vague promises.",
        "No one-line emails.",
        "You stay informed at every step — from planning to execution, testing, deployment, and support.",
      ],
      image: "/images/section5.jpg",
    },
    {
      title: "We Partner for Long Term, Not One Project",
      points: [
        "At CodeNergy, clients are not transactions — they are partnerships.",
        "We focus on building lasting relationships through:",
        "Consistent results",
        "Ethical work practices",
        "Professionalism",
        "Reliable support",
        "Your growth becomes our responsibility.",
      ],
      image: "/images/section6.jpg",
    },
    {
      title: "We Measure Everything",
      points: [
        "If it can be measured — we optimize it.",
        "If it can be improved — we enhance it.",
      ],
      image: "/images/section7.jpg",
    },
  ];

  return (
    <div className="bg-black text-white py-20 px-6 md:px-16 lg:px-28 space-y-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-red-500">
        How We Do It — Our Philosophy
      </h1>

      {sections.map((sec, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Section */}
          <div
            className={`${
              index % 2 !== 0 ? "lg:order-last" : "lg:order-first"
            }`}
          >
            <h2 className="text-3xl font-semibold text-red-500 mb-6">
              {sec.title}
            </h2>
            <ul className="space-y-3 text-gray-300 leading-relaxed">
              {sec.points.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div
            className={`w-full h-80 lg:h-96 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 ${
              index % 2 !== 0 ? "lg:order-first" : "lg:order-last"
            }`}
          >
            <Image
              src={sec.image}
              alt={sec.title}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
