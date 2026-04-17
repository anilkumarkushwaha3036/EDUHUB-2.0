'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatItem { value: number; label: string; suffix?: string; icon: string; }

const stats: StatItem[] = [
  { value: 8, label: 'Skill Categories', suffix: '+', icon: '🎯' },
  { value: 55, label: 'Curated Resources', suffix: '+', icon: '🔗' },
  { value: 3, label: 'Resource Types', suffix: '', icon: '📚' },
  { value: 100, label: 'Free Forever', suffix: '%', icon: '💙' },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="section" style={{ paddingTop: '0', paddingBottom: '4rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px', background: 'rgba(59,130,246,0.1)', borderRadius: '1.5rem', overflow: 'hidden',
            border: '1px solid rgba(59,130,246,0.15)',
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              background: 'rgba(13,21,38,0.9)', padding: '2rem 1.5rem', textAlign: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', fontWeight: 900, color: '#f0f6ff', letterSpacing: '-0.03em' }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
