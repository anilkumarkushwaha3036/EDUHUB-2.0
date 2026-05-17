"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Skill } from "@/types";
import { ArrowRight } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  index?: number;
  compact?: boolean;
}

export default function SkillCard({
  skill,
  index = 0,
  compact = false,
}: SkillCardProps) {
  const skillColors: Record<string, string> = {
    "web-dev": "#3b82f6",
    "ai-ml": "#8b5cf6",
    "data-science": "#10b981",
    "dsa": "#eab308",
    "devops": "#f97316",
    "cybersecurity": "#ef4444",
  };

  const accentColor = skillColors[skill.slug] || "var(--accent-secondary)";

  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="skill-card-container"
    >
      <div
        className={`skill-card ${compact ? "compact" : ""}`}
        style={{
          "--skill-accent": accentColor,
        } as React.CSSProperties}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "0.25rem",
              background: `${accentColor}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: accentColor,
            }}
          >
            <ArrowRight size={16} />
          </div>
        </div>

        <h3
          style={{
            fontSize: compact ? "0.95rem" : "1.05rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.375rem",
            lineHeight: 1.3,
          }}
        >
          {skill.name}
        </h3>

        {!compact && (
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: "1rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {skill.description}
          </p>
        )}

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: accentColor,
              background: `${accentColor}12`,
              padding: "0.15rem 0.6rem",
              borderRadius: "0.25rem",
            }}
          >
            {skill.resourceCount} resources
          </span>
        </div>
      </div>
    </Link>
  );
}
