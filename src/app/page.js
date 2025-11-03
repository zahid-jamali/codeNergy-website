import Image from "next/image";
import AboutSection from "./components/AboutSections";
import ContactSection from "./components/ContactSection";
import FeaturedService from "./components/FeaturedService";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import Navbar from "./components/Navbar";
import PricingTeaser from "./components/PricingTeaser";
import ServiceCards from "./components/ServiceCards";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestinomialSection";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <ServiceCards />
      <FeaturedService />
      <AboutSection />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <PricingTeaser />
      <ContactSection />
      <Footer />
      <h1 className="text-2xl text-white">Home page</h1>
    </>
  );
}
