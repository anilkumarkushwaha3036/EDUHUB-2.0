'use client';

import Link from 'next/link';
import { Zap, Heart } from 'lucide-react';

const footerLinks = {
  Explore: [
    { label: 'Home', href: '/' },
    { label: 'All Skills', href: '/skills' },
    { label: 'Resources', href: '/resources' },
    { label: 'Search', href: '/search' },
  ],
  Skills: [
    { label: 'Web Development', href: '/skills/web-development' },
    { label: 'AI & ML', href: '/skills/ai-ml' },
    { label: 'Data Science', href: '/skills/data-science' },
    { label: 'DSA & Algorithms', href: '/skills/dsa' },
  ],
  Platform: [
    { label: 'Admin CMS', href: '/admin', key: 'admin-cms' },
    { label: 'Submit Resource', href: '/admin', key: 'submit' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(59,130,246,0.1)', background: 'rgba(5,11,24,0.8)', marginTop: '4rem' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={16} color="white" fill="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f0f6ff' }}>EduHub</span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '220px' }}>
              The centralized hub for curated, structured, and beginner-friendly free learning resources.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ color: '#f0f6ff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{ color: '#475569', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div style={{ borderTop: '1px solid rgba(59,130,246,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#334155', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            Built with <Heart size={12} color="#ef4444" fill="#ef4444" /> for students everywhere
          </p>
          <p style={{ color: '#334155', fontSize: '0.825rem' }}>© 2024 EduHub. Free forever.</p>
        </div>
      </div>
    </footer>
  );
}
