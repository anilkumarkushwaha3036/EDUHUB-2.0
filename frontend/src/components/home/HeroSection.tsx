'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Zap } from 'lucide-react';

const floatingBadges = [
  { text: '🌐 Web Dev', delay: 0 },
  { text: '🤖 AI & ML', delay: 0.3 },
  { text: '📊 Data Science', delay: 0.6 },
  { text: '🧩 DSA', delay: 0.9 },
  { text: '☁️ DevOps', delay: 1.2 },
  { text: '🔐 Cybersecurity', delay: 1.5 },
];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '5rem' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div className="bg-orb bg-orb-blue" style={{ width: '600px', height: '600px', top: '-100px', left: '-200px' }} />
      <div className="bg-orb bg-orb-purple" style={{ width: '500px', height: '500px', bottom: '-100px', right: '-150px' }} />
      <div className="bg-orb bg-orb-cyan" style={{ width: '400px', height: '400px', top: '30%', right: '10%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '3rem', paddingBottom: '5rem' }}>
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}
        >
          <span style={{
            background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)',
            color: '#60a5fa', padding: '0.375rem 1rem', borderRadius: '999px',
            fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <Sparkles size={14} /> Free Resources · Curated & Structured
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.75rem, 6vw, 5rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1.05,
            color: '#f0f6ff', marginBottom: '1.25rem',
          }}
        >
          Stop Searching.<br />
          <span className="gradient-text">Start Learning.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#64748b', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}
        >
          The centralized hub for the <strong style={{ color: '#94a3b8' }}>best free learning resources</strong> across all tech domains.
          Curated, structured, and beginner-friendly.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSearch}
          style={{ display: 'flex', maxWidth: '580px', margin: '0 auto 1.5rem', gap: '0.75rem' }}
        >
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search React, Python, Neural Networks..."
              className="input"
              style={{ paddingLeft: '2.75rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '1rem' }}
              id="hero-search"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', whiteSpace: 'nowrap' }}>
            <Zap size={16} /> Search
          </button>
        </motion.form>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          <a href="/skills" className="btn-primary" style={{ textDecoration: 'none' }}>
            Browse Skills <ArrowRight size={16} />
          </a>
          <a href="/resources" className="btn-secondary" style={{ textDecoration: 'none' }}>
            All Resources
          </a>
        </motion.div>

        {/* Floating Skill Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {floatingBadges.map((badge) => (
            <motion.span
              key={badge.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + badge.delay }}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: '999px',
                background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(59,130,246,0.15)',
                color: '#475569', fontSize: '0.82rem', fontWeight: 500,
                backdropFilter: 'blur(10px)',
              }}
            >
              {badge.text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
