import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "All Skills — EduHub",
  description:
    "Browse all tech skill categories on EduHub — Web Dev, AI/ML, Data Science, DSA, DevOps, and more.",
};

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        <SkillsPageClient />
      </main>
      <Footer />
    </>
  );
}
