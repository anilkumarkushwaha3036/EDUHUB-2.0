'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn, Zap } from 'lucide-react';
import { adminLogin } from '@/lib/api';

export default function AdminLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem('eduhub_token', data.token);
      router.push('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '2rem',
    }}>
      <div className="bg-orb bg-orb-blue" style={{ width: '500px', height: '500px', top: '-100px', left: '-100px' }} />
      <div className="bg-orb bg-orb-purple" style={{ width: '400px', height: '400px', bottom: '-100px', right: '-100px' }} />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(13,21,38,0.95)', border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: '1.75rem', padding: '3rem', width: '100%', maxWidth: '420px',
          backdropFilter: 'blur(20px)', position: 'relative', zIndex: 1,
          boxShadow: '0 0 60px rgba(59,130,246,0.1)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
            boxShadow: '0 0 30px rgba(59,130,246,0.3)',
          }}>
            <Zap size={28} color="white" fill="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f0f6ff', marginBottom: '0.375rem' }}>Admin CMS</h1>
          <p style={{ color: '#475569', fontSize: '0.875rem' }}>EduHub Resource Management</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.875rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#f87171', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@eduhub.com" className="input"
              style={{ paddingLeft: '2.5rem' }} required id="admin-email"
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" className="input"
              style={{ paddingLeft: '2.5rem' }} required id="admin-password"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}
            style={{ justifyContent: 'center', paddingTop: '0.875rem', paddingBottom: '0.875rem', marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
            <LogIn size={16} /> {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#334155', fontSize: '0.8rem', marginTop: '1.5rem' }}>
          Default: admin@eduhub.com / Admin@123
        </p>
      </motion.div>
    </div>
  );
}
