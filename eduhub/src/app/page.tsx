import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSkillsSection from "@/components/home/FeaturedSkillsSection";
import FeaturedResourcesSection from "@/components/home/FeaturedResourcesSection";

export const metadata: Metadata = {
  title: "EduHub — Curated Free Learning Resources",
  description:
    "Discover the best free resources for Web Development, AI/ML, Data Science, DSA, and more. Structured. Curated. Beginner-friendly.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedSkillsSection />
        <FeaturedResourcesSection />
      </main>
      <Footer />
    </>
  );
}
