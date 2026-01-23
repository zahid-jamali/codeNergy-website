"use client";

import { useEffect, useState } from "react";
import HeroSlider from "@/components/landings/HeroSlider";
import WhoWeAreSection from "@/components/landings/WhoWeAreSection";
import FeaturedService from "@/components/landings/FeaturedService";
import ServicesCarousel from "@/components/landings/ServicesCarousals";
import AboutSection from "../../components/landings/AboutSections";
import StatsSection from "../../components/landings/StatsSection";
import WhyChooseUs from "../../components/landings/WhyChooseUs";
import TestimonialsSection from "../../components/landings/TestinomialSection";
import PricingTeaser from "../../components/landings/PricingTeaser";
import ServiceCards from "../../components/landings/ServiceCards";
import ContactSection from "../../components/landings/ContactSection";
import Footer from "../../components/landings/Footer";
import Loading from "@/components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, commentsRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/testinomials"),
        ]);

        const [servicesData, commentsData] = await Promise.all([
          servicesRes.json(),
          commentsRes.json(),
        ]);

        setServices(servicesData);
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <HeroSlider />
      <WhoWeAreSection />
      <FeaturedService />
      <ServicesCarousel Services={services} />
      <AboutSection />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialsSection Comments={comments} />
      {/* <PricingTeaser /> */}
      <ServiceCards />
      <ContactSection />
    </>
  );
}
