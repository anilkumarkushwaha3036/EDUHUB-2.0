"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ResourceCard from "@/components/ui/ResourceCard";
import FilterBar from "@/components/ui/FilterBar";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import {
  fetchSkillBySlug,
  fetchResources,
  fetchResourceTypes,
} from "@/lib/api";
import { Skill, Resource, ResourceType } from "@/types";

interface Props {
  slug: string;
}

const colorMap: Record<string, string> = {
  blue: "#3b82f6",
  purple: "#8b5cf6",
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
  cyan: "#06b6d4",
  pink: "#ec4899",
  orange: "#f97316",
};

export default function SkillDetailClient({ slug }: Props) {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    Promise.all([fetchSkillBySlug(slug), fetchResourceTypes()]).then(
      ([s, t]) => {
        setSkill(s);
        setTypes(t);
      },
    );
  }, [slug]);

  useEffect(() => {
    if (!skill) return;
    setLoading(true);
    fetchResources({
      skill: slug,
      type: selectedType || undefined,
      level: selectedLevel || undefined,
      limit: 24,
    })
      .then((res) => {
        setResources(res.data);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [skill, slug, selectedType, selectedLevel]);

  if (!skill && !loading)
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Skill not found.</p>
        <Link
          href="/skills"
          className="btn-primary"
          style={{
            textDecoration: "none",
            marginTop: "1rem",
            display: "inline-flex",
          }}
        >
          Back to Skills
        </Link>
      </div>
    );

  const accentColor = skill ? colorMap[skill.color] || "#3b82f6" : "#3b82f6";

  return (
    <section className="section">
      <div className="container">
        {/* Back */}
        <Link
          href="/skills"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            marginBottom: "2rem",
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={15} /> Back to Skills
        </Link>

        {/* Skill Header */}
        {skill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "var(--gradient-card)",
              border: `1px solid ${accentColor}30`,
              borderRadius: "0.5rem",
              padding: "2.5rem",
              marginBottom: "2.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "200px",
                height: "200px",
                borderRadius: "0.5rem",
                background: `radial-gradient(circle, ${accentColor}15, transparent 70%)`,
                filter: "blur(30px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                position: "relative",
                flexWrap: "wrap",
              }}
            >

              <div>
                <h1
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {skill.name}
                </h1>
                <p
                  style={{
                    color: "var(--text-muted)",
                    maxWidth: "600px",
                    lineHeight: 1.6,
                  }}
                >
                  {skill.description}
                </p>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: accentColor,
                  }}
                >
                  {total}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  resources
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            background: "var(--glass-bg)",
            border: "1px solid rgba(59,130,246,0.1)",
            borderRadius: "0.5rem",
            padding: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          <FilterBar
            types={types}
            selectedType={selectedType}
            selectedLevel={selectedLevel}
            onTypeChange={setSelectedType}
            onLevelChange={setSelectedLevel}
          />
        </motion.div>

        {/* Resources Grid */}
        {loading ? (
          <LoadingSkeleton count={6} type="resource" />
        ) : resources.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              color: "var(--text-muted)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p>No resources found for this filter combination.</p>
          </div>
        ) : (
          <div className="grid-resources">
            {resources.map((resource, i) => (
              <ResourceCard key={resource._id} resource={resource} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
