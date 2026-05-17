"use client";

import { motion } from "framer-motion";
import { Resource, ResourceLevel } from "@/types";
import { ExternalLink, Tag } from "lucide-react";

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
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-card-link"
    >
      <div className="resource-card">
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
        <div className="resource-card-footer">
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
            <ExternalLink size={14} color="var(--accent-primary)" />
          </div>
        </div>
      </div>
    </a>
  );
}

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}
