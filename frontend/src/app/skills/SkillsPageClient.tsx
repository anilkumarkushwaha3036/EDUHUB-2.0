"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import SkillCard from "@/components/ui/SkillCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { fetchSkills } from "@/lib/api";
import { Skill } from "@/types";

export default function SkillsPageClient() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              background: "var(--border-subtle)",
              border: "1px solid rgba(59,130,246,0.25)",
              padding: "0.375rem 1rem",
              borderRadius: "0.25rem",
            }}
          >
            <BookOpen size={14} color="#60a5fa" />
            <span
              style={{ color: "#60a5fa", fontSize: "0.85rem", fontWeight: 600 }}
            >
              {skills.length} Skill Categories
            </span>
          </div>
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            All Skill <span className="gradient-text">Categories</span>
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: "500px",
              margin: "0 auto",
              fontSize: "1rem",
            }}
          >
            Pick a domain and explore the best free resources curated just for
            you.
          </p>
        </motion.div>

        {loading ? (
          <LoadingSkeleton count={8} type="skill" />
        ) : (
          <div className="grid-skills">
            {skills.map((skill, i) => (
              <SkillCard key={skill._id} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
