import Navbar from "@/components/layout/Navbar";
import AIToolsClient from "./AIToolsClient";

export const metadata = {
  title: "AI Tools | EduHub",
  description: "Discover the best AI tools for developers and learners.",
};

export default function AIToolsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        <AIToolsClient />
      </main>
    </>
  );
}
