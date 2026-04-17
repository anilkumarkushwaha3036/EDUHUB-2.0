'use client';

import { ResourceLevel } from '@/types';

interface FilterBarProps {
  types: { _id: string; name: string; slug: string; icon: string }[];
  selectedType: string;
  selectedLevel: string;
  onTypeChange: (slug: string) => void;
  onLevelChange: (level: string) => void;
}

const levels: { value: string; label: string }[] = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: '🟢 Beginner' },
  { value: 'intermediate', label: '🟡 Intermediate' },
  { value: 'advanced', label: '🔴 Advanced' },
];

export default function FilterBar({ types, selectedType, selectedLevel, onTypeChange, onLevelChange }: FilterBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {/* Resource Type Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600, marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type:</span>
        <button
          className={`filter-pill ${selectedType === '' ? 'active' : ''}`}
          onClick={() => onTypeChange('')}
          id="filter-type-all"
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type._id}
            className={`filter-pill ${selectedType === type.slug ? 'active' : ''}`}
            onClick={() => onTypeChange(type.slug)}
            id={`filter-type-${type.slug}`}
          >
            {type.icon} {type.name}
          </button>
        ))}
      </div>

      {/* Level Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600, marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Level:</span>
        {levels.map((level) => (
          <button
            key={level.value}
            className={`filter-pill ${selectedLevel === level.value ? 'active' : ''}`}
            onClick={() => onLevelChange(level.value)}
            id={`filter-level-${level.value || 'all'}`}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
