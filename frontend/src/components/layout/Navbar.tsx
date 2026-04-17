'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, BookOpen, Menu, X, Zap } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/skills', label: 'Skills' },
    { href: '/resources', label: 'Resources' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '68px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="white" fill="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#f0f6ff', letterSpacing: '-0.02em' }}>
            Edu<span style={{ background: 'linear-gradient(135deg, #60a5fa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hub</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '1rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: isActive(link.href) ? '#60a5fa' : '#94a3b8',
              background: isActive(link.href) ? 'rgba(59,130,246,0.1)' : 'transparent',
              transition: 'all 0.2s ease',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Search bar (desktop) */}
        <form onSubmit={handleSearch} className="desktop-nav" style={{ position: 'relative' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="input"
            style={{ width: '240px', paddingLeft: '2.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.875rem' }}
          />
          <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
        </form>

        {/* Admin link */}
        <Link href="/admin" className="desktop-nav" style={{
          textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.75rem',
          fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8',
          border: '1px solid rgba(59,130,246,0.2)', transition: 'all 0.2s ease',
        }}>
          Admin
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-nav"
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem' }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(5,11,24,0.98)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(59,130,246,0.1)', padding: '1rem',
        }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '0.875rem',
                fontSize: '1rem', fontWeight: 500,
                color: isActive(link.href) ? '#60a5fa' : '#94a3b8',
                background: isActive(link.href) ? 'rgba(59,130,246,0.1)' : 'transparent',
              }}>
                {link.label}
              </Link>
            ))}
            <form onSubmit={handleSearch} style={{ position: 'relative', marginTop: '0.5rem' }}>
              <input
                type="text" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="input"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @media (min-width: 769px) { .mobile-nav { display: none !important; } }
      `}</style>
    </nav>
  );
}
