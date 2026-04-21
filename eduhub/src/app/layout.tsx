import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "EduHub — Curated Free Learning Resources",
  description:
    "Discover the best free resources for Web Development, AI/ML, Data Science, DSA, DevOps, and more. Curated, structured, and beginner-friendly.",
  keywords: [
    "learning resources",
    "free courses",
    "web development",
    "AI ML",
    "data science",
    "DSA",
    "programming",
  ],
  openGraph: {
    title: "EduHub — Curated Free Learning Resources",
    description:
      "Your centralized hub for the best free learning resources across all tech domains.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
