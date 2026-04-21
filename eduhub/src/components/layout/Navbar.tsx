"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, BookOpen, Menu, X, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
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
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "0.25rem",
              background: "var(--gradient-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={18} color="white" fill="white" />
          </div>
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
            style={{ position: "relative" }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="input"
              style={{
                width: "240px",
                paddingLeft: "2.5rem",
                height: "38px",
                fontSize: "0.875rem",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: "1px solid var(--border-default)",
              }}
            />
            <Search
              size={15}
              style={{
                position: "absolute",
                left: "0.875rem",
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

      <style jsx>{`
        .navbar {
          padding: 1rem 0;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          padding: 0.5rem 0;
        }
        .nav-island {
          background: var(--navbar-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-default);
          border-radius: 0.25rem;
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 1.25rem;
          box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        .navbar.scrolled .nav-island {
           box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
           border-color: var(--border-strong);
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
           .nav-island {
            margin: 0 0.5rem;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
