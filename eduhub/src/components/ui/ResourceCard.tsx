"use client";

import { motion } from "framer-motion";
import { Resource, ResourceLevel } from "@/types";
import { ExternalLink, Eye, Tag } from "lucide-react";

const levelConfig: Record<ResourceLevel, { label: string }> = {
  beginner: { label: "Beginner" },
  intermediate: { label: "Intermediate" },
  advanced: { label: "Advanced" },
};

export default function ResourceCard({
  resource,
  index = 0,
}: ResourceCardProps) {
  const levelInfo = levelConfig[resource.level];

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
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          className="card"
          style={{
            padding: "1.25rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
            borderRadius: "0.5rem",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
          {/* Top badges */}
          <div
            style={{
              display: "flex",
              gap: "0.375rem",
              flexWrap: "wrap",
              marginBottom: "0.875rem",
            }}
          >
            <span
              className="badge"
              style={{
                background: "var(--accent-glow)",
                color: "var(--accent-primary)",
                border: "1px solid transparent",
              }}
            >
              {(resource.typeId as any)?.name}
            </span>
            <span
              className="badge"
              style={{
                background: "var(--bg-primary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {levelInfo.label}
            </span>
            {resource.isFeatured && (
              <span
                className="badge"
                style={{
                  background: "var(--gradient-blue)",
                  color: "white",
                  border: "none",
                }}
              >
                Featured
              </span>
            )}
          </div>

          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {resource.title}
          </h3>

          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {resource.description}
          </p>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                flexWrap: "wrap",
                marginBottom: "1.25rem",
              }}
            >
              {resource.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.68rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "0.25rem",
                    background: "var(--bg-primary)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "0.875rem",
              marginTop: "auto",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--accent-primary)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {(resource.skillId as any)?.name}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <Eye size={12} /> {resource.views}
              </span>
              <ExternalLink size={14} color="var(--accent-primary)" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}
