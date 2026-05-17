"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, BookOpen, Menu, X, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/skills", label: "Skills" },
    { href: "/resources", label: "Resources" },
    { href: "/ai-tools", label: "AI Tools" },
    { href: "/blogs", label: "Blogs" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className="navbar">
      <div
        className="container nav-island"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Edu<span className="gradient-text">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{ display: "flex", gap: "0.25rem", marginLeft: "1rem" }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                padding: "0 1rem",
                borderRadius: "0.25rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                height: "38px",
                display: "flex",
                alignItems: "center",
                color: isActive(link.href)
                  ? "var(--accent-primary)"
                  : "var(--text-secondary)",
                background: isActive(link.href)
                  ? "var(--accent-glow)"
                  : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop Header Actions Group */}
        <div style={{ display: "flex", alignItems: "center", gap: "0" }} className="desktop-nav">
          {/* Search bar (desktop) */}
          <form
            onSubmit={handleSearch}
            style={{ position: "relative", zIndex: 1 }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="input"
              style={{
                width: "240px",
                paddingLeft: "1.0rem",
                paddingRight: "2.5rem",
                height: "38px",
                fontSize: "0.875rem",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <Search
              size={15}
              style={{
                position: "absolute",
                right: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
          </form>

          {/* Admin link */}
          <Link
            href="/admin"
            style={{
              textDecoration: "none",
              padding: "0 1rem",
              borderRadius: 0,
              fontSize: "0.85rem",
              fontWeight: 600,
              height: "38px",
              display: "flex",
              alignItems: "center",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-default)",
              borderLeft: "none",
              borderRight: "none",
              background: "var(--bg-secondary)",
              transition: "all 0.2s ease",
            }}
          >
            Admin
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: "none",
            }}
          />
        </div>

        {/* Mobile menu toggle */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          className="mobile-nav"
        >
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0.5rem",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "var(--mobile-menu-bg)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "1rem",
          }}
        >
          <div
            className="container"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: isActive(link.href)
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                  background: isActive(link.href)
                    ? "var(--accent-glow)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            <form
              onSubmit={handleSearch}
              style={{ position: "relative", marginTop: "0.5rem" }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="input"
                style={{ paddingLeft: "2.5rem" }}
              />
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
            </form>
          </div>
        </div>
      )}

    </nav>
  );
}
