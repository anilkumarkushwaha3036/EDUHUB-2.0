'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import ResourceCard from '@/components/ui/ResourceCard';
import FilterBar from '@/components/ui/FilterBar';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { fetchResources, fetchResourceTypes, fetchSkills } from '@/lib/api';
import { Resource, ResourceType, Skill } from '@/types';

export default function ResourcesPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [resources, setResources] = useState<Resource[]>([]);
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('skill') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || '');

  useEffect(() => {
    Promise.all([fetchResourceTypes(), fetchSkills()]).then(([t, s]) => { setTypes(t); setSkills(s); });
  }, []);

  const loadResources = useCallback(() => {
    setLoading(true);
    fetchResources({
      skill: selectedSkill || undefined,
      type: selectedType || undefined,
      level: selectedLevel || undefined,
      page, limit: 12,
    }).then((res) => { setResources(res.data); setTotal(res.total); }).finally(() => setLoading(false));
  }, [selectedSkill, selectedType, selectedLevel, page]);

  useEffect(() => { loadResources(); }, [loadResources]);

  const handleSkillChange = (slug: string) => { setSelectedSkill(slug); setPage(1); };
  const handleTypeChange = (slug: string) => { setSelectedType(slug); setPage(1); };
  const handleLevelChange = (level: string) => { setSelectedLevel(level); setPage(1); };

  const totalPages = Math.ceil(total / 12);

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', padding: '0.375rem 1rem', borderRadius: '999px' }}>
            <Layers size={14} color="#60a5fa" />
            <span style={{ color: '#60a5fa', fontSize: '0.85rem', fontWeight: 600 }}>{total} Resources</span>
          </div>
          <h1 className="section-title">All <span className="gradient-text">Resources</span></h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Sidebar Filters */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            style={{ background: 'rgba(13,21,38,0.7)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '1.25rem', padding: '1.25rem', position: 'sticky', top: '5.5rem' }}
          >
            <h3 style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Filters</h3>

            {/* Skill filter */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 600, marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skill</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <button className={`filter-pill ${selectedSkill === '' ? 'active' : ''}`} onClick={() => handleSkillChange('')} style={{ justifyContent: 'flex-start' }}>All Skills</button>
                {skills.map((s) => (
                  <button key={s._id} className={`filter-pill ${selectedSkill === s.slug ? 'active' : ''}`} onClick={() => handleSkillChange(s.slug)} style={{ justifyContent: 'flex-start' }}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Type filter */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 600, marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Type</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <button className={`filter-pill ${selectedType === '' ? 'active' : ''}`} onClick={() => handleTypeChange('')} style={{ justifyContent: 'flex-start' }}>All Types</button>
                {types.map((t) => (
                  <button key={t._id} className={`filter-pill ${selectedType === t.slug ? 'active' : ''}`} onClick={() => handleTypeChange(t.slug)} style={{ justifyContent: 'flex-start' }}>
                    {t.icon} {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Level filter */}
            <div>
              <p style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 600, marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Level</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {[{ v: '', l: 'All Levels' }, { v: 'beginner', l: '🟢 Beginner' }, { v: 'intermediate', l: '🟡 Intermediate' }, { v: 'advanced', l: '🔴 Advanced' }].map((item) => (
                  <button key={item.v} className={`filter-pill ${selectedLevel === item.v ? 'active' : ''}`} onClick={() => handleLevelChange(item.v)} style={{ justifyContent: 'flex-start' }}>{item.l}</button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <div>
            {loading ? <LoadingSkeleton count={6} type="resource" /> : resources.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#475569' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <p>No resources match your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid-resources">
                  {resources.map((r, i) => <ResourceCard key={r._id} resource={r} index={i} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        style={{
                          width: '36px', height: '36px', borderRadius: '0.75rem', border: '1px solid',
                          borderColor: page === i + 1 ? '#3b82f6' : 'rgba(59,130,246,0.2)',
                          background: page === i + 1 ? 'rgba(59,130,246,0.2)' : 'transparent',
                          color: page === i + 1 ? '#60a5fa' : '#475569', cursor: 'pointer', fontWeight: 600,
                        }}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
