'use client';

import { motion } from 'framer-motion';
import { Resource, ResourceLevel } from '@/types';
import { ExternalLink, Eye, Tag } from 'lucide-react';

const levelConfig: Record<ResourceLevel, { label: string; class: string }> = {
  beginner:     { label: '🟢 Beginner',     class: 'badge-beginner' },
  intermediate: { label: '🟡 Intermediate', class: 'badge-intermediate' },
  advanced:     { label: '🔴 Advanced',      class: 'badge-advanced' },
};

const typeStyleMap: Record<string, string> = {
  youtube:  'type-badge-youtube',
  docs:     'type-badge-docs',
  practice: 'type-badge-practice',
};

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

export default function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  const levelInfo = levelConfig[resource.level];
  const typeClass = typeStyleMap[resource.typeId?.slug] || 'badge-blue';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
    >
      <a href={resource.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="card"
          style={{ padding: '1.375rem', height: '100%', display: 'flex', flexDirection: 'column' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.35)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(59,130,246,0.12)';
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.1)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          }}
        >
          {/* Top badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
            <span className={`badge ${typeClass}`}>
              {resource.typeId?.icon} {resource.typeId?.name}
            </span>
            <span className={`badge ${levelInfo.class}`}>{levelInfo.label}</span>
            {resource.isFeatured && <span className="badge badge-blue">⭐ Featured</span>}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1rem', fontWeight: 700, color: '#f0f6ff', marginBottom: '0.5rem',
            lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {resource.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.83rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1rem',
            flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {resource.description}
          </p>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {resource.tags.slice(0, 3).map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '999px',
                  background: 'rgba(59,130,246,0.08)', color: '#475569',
                  border: '1px solid rgba(59,130,246,0.1)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(59,130,246,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#1e3a5f', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {resource.skillId?.icon} {resource.skillId?.name}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Eye size={12} /> {resource.views}
              </span>
              <ExternalLink size={14} color="#3b82f6" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
