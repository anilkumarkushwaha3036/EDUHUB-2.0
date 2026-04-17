'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Skill, SkillColor } from '@/types';
import { ArrowRight } from 'lucide-react';

const colorMap: Record<SkillColor, { bg: string; border: string; glow: string; text: string }> = {
  blue:   { bg: 'rgba(59,130,246,0.08)',   border: 'rgba(59,130,246,0.25)',  glow: 'rgba(59,130,246,0.15)',   text: '#60a5fa' },
  purple: { bg: 'rgba(139,92,246,0.08)',   border: 'rgba(139,92,246,0.25)',  glow: 'rgba(139,92,246,0.15)',   text: '#a78bfa' },
  green:  { bg: 'rgba(16,185,129,0.08)',   border: 'rgba(16,185,129,0.25)',  glow: 'rgba(16,185,129,0.15)',   text: '#34d399' },
  yellow: { bg: 'rgba(245,158,11,0.08)',   border: 'rgba(245,158,11,0.25)',  glow: 'rgba(245,158,11,0.15)',   text: '#fbbf24' },
  red:    { bg: 'rgba(239,68,68,0.08)',     border: 'rgba(239,68,68,0.25)',   glow: 'rgba(239,68,68,0.15)',    text: '#f87171' },
  cyan:   { bg: 'rgba(6,182,212,0.08)',    border: 'rgba(6,182,212,0.25)',   glow: 'rgba(6,182,212,0.15)',    text: '#22d3ee' },
  pink:   { bg: 'rgba(236,72,153,0.08)',   border: 'rgba(236,72,153,0.25)',  glow: 'rgba(236,72,153,0.15)',   text: '#f472b6' },
  orange: { bg: 'rgba(249,115,22,0.08)',   border: 'rgba(249,115,22,0.25)',  glow: 'rgba(249,115,22,0.15)',   text: '#fb923c' },
};

interface SkillCardProps {
  skill: Skill;
  index?: number;
  compact?: boolean;
}

export default function SkillCard({ skill, index = 0, compact = false }: SkillCardProps) {
  const colors = colorMap[skill.color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/skills/${skill.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          style={{
            background: `linear-gradient(145deg, ${colors.bg}, rgba(13,21,38,0.9))`,
            border: `1px solid ${colors.border}`,
            borderRadius: '1.25rem',
            padding: compact ? '1.25rem' : '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px ${colors.border}, 0 8px 40px ${colors.glow}`;
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          }}
        >
          {/* Glow orb top-right */}
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px',
            width: '80px', height: '80px', borderRadius: '50%',
            background: colors.glow, filter: 'blur(20px)', pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: compact ? '1.75rem' : '2.25rem', lineHeight: 1 }}>{skill.icon}</span>
            <ArrowRight size={16} color={colors.text} style={{ opacity: 0.6, marginTop: '0.25rem', flexShrink: 0 }} />
          </div>

          <h3 style={{ fontSize: compact ? '0.95rem' : '1.05rem', fontWeight: 700, color: '#f0f6ff', marginBottom: '0.375rem', lineHeight: 1.3 }}>
            {skill.name}
          </h3>

          {!compact && (
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {skill.description}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: colors.text }}>
              {skill.resourceCount} resources
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
