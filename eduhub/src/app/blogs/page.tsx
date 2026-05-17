import Navbar from "@/components/layout/Navbar";
import BlogsClient from "./BlogsClient";

export const metadata = {
  title: "Blogs | EduHub",
  description: "Read the latest tech blogs and tutorials.",
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        <BlogsClient />
      </main>
    </>
  );
}
