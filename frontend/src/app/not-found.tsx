'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-orb bg-orb-blue" style={{ width: '600px', height: '600px', top: '-150px', left: '-200px' }} />
      <div className="bg-orb bg-orb-purple" style={{ width: '500px', height: '500px', bottom: '-150px', right: '-100px' }} />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '8rem', lineHeight: 1, marginBottom: '1rem', fontWeight: 900, background: 'linear-gradient(135deg,#60a5fa,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f0f6ff', marginBottom: '0.875rem' }}>Page not found</h1>
        <p style={{ color: '#475569', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
