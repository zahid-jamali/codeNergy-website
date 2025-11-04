import Image from "next/image";
import AboutSection from "../components/landings/AboutSections";
import ContactSection from "../components/landings/ContactSection";
import FeaturedService from "../components/landings/FeaturedService";
import Footer from "../components/landings/Footer";
import HeroSlider from "../components/landings/HeroSlider";
import Navbar from "../components/landings/Navbar";
import PricingTeaser from "../components/landings/PricingTeaser";
import ServiceCards from "../components/landings/ServiceCards";
import StatsSection from "../components/landings/StatsSection";
import TestimonialsSection from "../components/landings/TestinomialSection";
import WhyChooseUs from "../components/landings/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <ServiceCards />
      <FeaturedService />
      <AboutSection />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <PricingTeaser />
      <ContactSection />
    </>
  );
}
