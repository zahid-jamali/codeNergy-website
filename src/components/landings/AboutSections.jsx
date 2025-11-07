import React from "react";
// Import icons from react-icons (using Fa and Bs for a close match)
import { FaBuilding, FaFlag } from "react-icons/fa";

const AboutSection = () => {
  return (
    // Main container with dark background and padding
    <section className=" m-auto md:px-12 py-16 md:py-24 text-white">
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
              Solutions Your
              <span className="text-red-500 block sm:inline">
                {" "}
                Company Future
              </span>
            </h2>

            {/* Main Text */}
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Our team dolor sit amet, consectetur adipiscing elit. Vivamus
              fringilla egestas lobortis. Vivamus pretium posuere dolor, sed
              tristique nibh fringilla rhoncus. Ut maximus mi nec lorem blandit
              consectetur. Fusce nisi neque, vulputate a velit vitae, congue
              porttitor dui. Morbi id neque eu.
            </p>

            {/* Vision and Mission */}
            <div className="space-y-8">
              {/* Our Vision */}
              <div className="flex items-start">
                {/* Updated Icon: FaBuilding */}
                <div className="p-3 bg-gray-800 rounded-full mr-4 mt-1">
                  <FaBuilding className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Our Vision</h3>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper.
                  </p>
                </div>
              </div>

              {/* Our Mission */}
              <div className="flex items-start">
                {/* Updated Icon: FaFlag */}
                <div className="p-3 bg-gray-800 rounded-full mr-4 mt-1">
                  <FaFlag className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Our Mission</h3>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image and Signature */}
          <div className="lg:w-1/2 relative order-1 lg:order-2 w-full max-w-md lg:max-w-none">
            {/* Image Placeholder - Use Next.js <Image> for production */}
            <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px]  overflow-hidden shadow-2xl rounded-lg">
              {/* Placeholder for the image effect */}
              <div className="absolute inset-0 bg-cover bg-center">
                <img src="/images/ceo.png" />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black opacity-30"></div>
              </div>
            </div>

            {/* Signature and Title Block */}
            <div className="absolute bottom-4 left-4 p-4">
              {/* Note: The signature font style is kept for visual similarity */}
              <p
                className="text-red-500 text-5xl font-signature italic mb-2 select-none"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Benny Ricardo
              </p>
              <p className="text-white text-xl font-bold leading-none">
                Benny Ricardo
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
