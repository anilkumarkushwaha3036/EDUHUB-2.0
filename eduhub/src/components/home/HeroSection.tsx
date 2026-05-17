"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Search, Sparkles, ArrowRight, Zap } from "lucide-react";

const floatingBadges = [
  { text: "Web Dev", delay: 0 },
  { text: "AI & ML", delay: 0.3 },
  { text: "Data Science", delay: 0.6 },
  { text: "DSA", delay: 0.9 },
  { text: "DevOps", delay: 1.2 },
  { text: "Cybersecurity", delay: 1.5 },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim())
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "7rem",
        paddingBottom: "1.5rem",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--gradient-hero)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingBottom: "1rem",
        }}
      >
        {/* Eyebrow tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
              padding: "0.375rem 1rem",
              borderRadius: "0.25rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            }}
          >
            <Sparkles size={14} color="var(--accent-primary)" /> Free Resources · Curated & Structured
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="hero-bounded-box"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--text-primary)",
            marginBottom: "1rem",
          }}
        >
          Stop Searching,
          <br />
          <span className="gradient-text">Start Learning.</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "800px",
            margin: "0 auto 2.25rem",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
          }}
        >
          The centralized hub for the{" "}
          <strong style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
            best free learning resources
          </strong>{" "}
          across all tech domains. Curated, structured, and beginner-friendly.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            maxWidth: "580px",
            margin: "0 auto 1.5rem",
            gap: "0.75rem",
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search React, Python, Neural Networks..."
              className="input"
              style={{
                paddingLeft: "1.25rem",
                paddingRight: "2.75rem",
                paddingTop: "0.875rem",
                paddingBottom: "0.875rem",
                fontSize: "1rem",
              }}
              id="hero-search"
            />
            <Search
              size={18}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn-secondary"
            style={{
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
              whiteSpace: "nowrap",
              borderRadius: "0.25rem",
            }}
          >
            Search
          </button>
        </form>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.875rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          <a
            href="/skills"
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            Browse Skills <ArrowRight size={16} />
          </a>
          <a
            href="/resources"
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            All Resources
          </a>
        </div>

        {/* Floating Skill Badges */}
        <div
          style={{
            display: "flex",
            gap: "0.625rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {floatingBadges.map((badge) => (
            <span
              key={badge.text}
              style={{
                padding: "0.375rem 0.875rem",
                borderRadius: "0.25rem",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                fontWeight: 500,
                boxShadow: "0 1px 1px rgba(0,0,0,0.01)",
              }}
            >
              {badge.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
