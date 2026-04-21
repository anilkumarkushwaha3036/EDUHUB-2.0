"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SkillCard from "@/components/ui/SkillCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { fetchSkills } from "@/lib/api";
import { Skill } from "@/types";

export default function FeaturedSkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" style={{ paddingTop: "2rem" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#3b82f6",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              Explore Topics
            </p>
            <h2 className="section-title">
              Learn Any Skill, <span className="gradient-text">For Free</span>
            </h2>
          </div>
          <Link href="/skills" style={{ textDecoration: "none" }}>
            <button
              className="btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              View all skills <ArrowRight size={15} />
            </button>
          </Link>
        </motion.div>

        {/* Grid */}
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
