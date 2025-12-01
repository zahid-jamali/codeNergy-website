"use client";
import React from "react";
import { FaUsers, FaCodeBranch, FaHeadset } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="m-auto md:px-8 py-16 md:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            {/* Header / Title */}
            <p className="text-red-500 font-medium tracking-widest text-sm uppercase mb-2 flex items-center">
              <span className="w-10 h-0.5 bg-red-500 mr-2"></span>
              About Us
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              Crafting Technology That
              <span className="text-red-500 block sm:inline">
                {" "}
                Moves Businesses Forward
              </span>
            </h2>

            {/* Main Text */}
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              We are a team of experienced IT professionals shaping digital
              success through software development, marketing, BPO services, and
              technical support. With years of execution and innovation behind
              us, we don’t just work with technology — we understand it and
              build the future through it.
            </p>

            {/* Strengths / Highlights */}
            <div className="space-y-8">
              {/* Experience */}
              <div className="flex items-start">
                <div className="p-3 bg-gray-800 rounded-full mr-4 mt-1">
                  <FaUsers className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Experienced Team</h3>
                  <p className="text-gray-400">
                    Skilled professionals with multi-industry experience in
                    delivering impactful digital solutions.
                  </p>
                </div>
              </div>

              {/* Services Strength */}
              <div className="flex items-start">
                <div className="p-3 bg-gray-800 rounded-full mr-4 mt-1">
                  <FaCodeBranch className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    All-in-One Capability
                  </h3>
                  <p className="text-gray-400">
                    From software and marketing to operations and support — we
                    provide a complete ecosystem for business growth.
                  </p>
                </div>
              </div>

              {/* Support */}
              <div className="flex items-start">
                <div className="p-3 bg-gray-800 rounded-full mr-4 mt-1">
                  <FaHeadset className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Reliable Support</h3>
                  <p className="text-gray-400">
                    Continuous assistance and dependable service that keeps your
                    operations running smoothly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image and Signature */}
          <div className="lg:w-1/2 relative order-1 lg:order-2 w-full max-w-md lg:max-w-none">
            {/* Image */}
            <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px] overflow-hidden shadow-2xl rounded-lg">
              <div className="absolute inset-0 bg-cover bg-center">
                <img src="/images/ceo.png" alt="CEO" />
                <div className="absolute inset-0 bg-black opacity-30"></div>
              </div>
            </div>

            {/* Signature and Title */}
            <div className="absolute bottom-4 left-4 p-4">
              <p
                className="text-red-500 text-5xl font-signature italic mb-2 select-none"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Adil Ali
              </p>
              <p className="text-white text-xl font-bold leading-none">
                Adil Ali
              </p>
              <p className="text-red-500 text-sm">CEO & Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
