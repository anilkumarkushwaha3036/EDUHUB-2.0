"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ResourceCard from "@/components/ui/ResourceCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { fetchResources } from "@/lib/api";
import { Resource } from "@/types";

export default function FeaturedResourcesSection() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources({ featured: true, limit: 6 })
      .then((res) => setResources(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="section"
      style={{
        background: "rgba(59,130,246,0.02)",
        borderTop: "1px solid rgba(59,130,246,0.06)",
        borderBottom: "1px solid rgba(59,130,246,0.06)",
      }}
    >
      <div className="container">
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
                color: "#06b6d4",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              ⭐ Hand-picked
            </p>
            <h2 className="section-title">
              Featured{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Resources
              </span>
            </h2>
          </div>
          <Link href="/resources" style={{ textDecoration: "none" }}>
            <button className="btn-secondary">
              View all <ArrowRight size={15} />
            </button>
          </Link>
        </motion.div>

        {loading ? (
          <LoadingSkeleton count={6} type="resource" />
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
