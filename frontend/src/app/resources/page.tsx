import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResourcesPageClient from "./ResourcesPageClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Resources — EduHub",
  description:
    "Browse and filter 55+ curated free learning resources across Web Dev, AI/ML, Data Science, DSA, and more.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        <Suspense fallback={<div style={{ padding: "5rem", textAlign: "center" }}>Loading...</div>}>
          <ResourcesPageClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
