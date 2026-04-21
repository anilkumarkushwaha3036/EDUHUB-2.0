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
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Link
        href={`/skills/${skill.slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          className="card"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
            borderRadius: "0.5rem",
            padding: compact ? "1.25rem" : "1.5rem",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minHeight: compact ? "auto" : "160px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "var(--accent-primary)";
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 10px 25px -5px var(--accent-glow)";
            (e.currentTarget as HTMLDivElement).style.transform =
              "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "var(--border-default)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            (e.currentTarget as HTMLDivElement).style.transform =
              "translateY(0)";
          }}
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
                background: "var(--accent-glow)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-primary)",
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
                color: "var(--accent-primary)",
                background: "var(--accent-glow)",
                padding: "0.15rem 0.6rem",
                borderRadius: "0.25rem",
              }}
            >
              {skill.resourceCount} resources
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
