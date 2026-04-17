'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import ResourceCard from '@/components/ui/ResourceCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { searchResources } from '@/lib/api';
import { Resource } from '@/types';

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<Resource[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setTotal(0); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    searchResources(q).then((res) => { setResults(res.data); setTotal(res.total); }).finally(() => setLoading(false));
  }, []);

  useEffect(() => { if (initialQ) doSearch(initialQ); }, [initialQ, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) { router.push(`/search?q=${encodeURIComponent(trimmed)}`); doSearch(trimmed); }
  };

  const clear = () => { setQuery(''); setResults([]); setTotal(0); setSearched(false); router.push('/search'); };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            Search <span className="gradient-text">Resources</span>
          </h1>
          <p style={{ color: '#64748b' }}>Find the perfect resource for what you want to learn</p>
        </motion.div>

        {/* Search Form */}
        <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for React, PyTorch, Docker, LeetCode..."
              className="input"
              style={{ paddingLeft: '2.75rem', paddingRight: query ? '2.75rem' : '1rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '1rem' }}
              id="search-input" autoFocus
            />
            {query && (
              <button type="button" onClick={clear} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}>
                <X size={16} />
              </button>
            )}
          </div>
          <button type="submit" className="btn-primary" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem' }}>
            <Search size={16} /> Search
          </button>
        </motion.form>

        {/* Results */}
        {loading ? <LoadingSkeleton count={6} type="resource" /> : (
          <>
            {searched && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {total > 0 ? `${total} result${total !== 1 ? 's' : ''} for "${initialQ}"` : `No results found for "${initialQ}"`}
              </motion.p>
            )}
            {results.length > 0 && (
              <div className="grid-resources">
                {results.map((r, i) => <ResourceCard key={r._id} resource={r} index={i} />)}
              </div>
            )}
            {searched && results.length === 0 && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Try a different search term like "React", "Python", "Machine Learning"</p>
                <button onClick={clear} className="btn-secondary">Clear search</button>
              </motion.div>
            )}
            {!searched && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
                <p style={{ color: '#475569' }}>Try searching for "React", "Python", "Machine Learning", "Docker"...</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
