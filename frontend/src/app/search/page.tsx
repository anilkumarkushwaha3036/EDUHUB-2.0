import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchPageClient from "./SearchPageClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search — EduHub",
  description: "Search across 55+ curated free learning resources.",
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        <Suspense fallback={<div style={{ padding: "5rem", textAlign: "center" }}>Searching...</div>}>
          <SearchPageClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
