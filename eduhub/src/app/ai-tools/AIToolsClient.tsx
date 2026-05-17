"use client";

import { useEffect, useState } from "react";
import { fetchAITools } from "@/lib/api";
import { AITool } from "@/types";
import { ExternalLink } from "lucide-react";

export default function AIToolsClient() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAITools()
      .then((data) => setTools(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
          Loading AI Tools...
        </div>
      ) : tools.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)", background: "var(--glass-bg)", borderRadius: "1rem", border: "1px solid var(--border-subtle)" }}>
          No AI tools available right now.
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1.5rem" 
        }}>
          {tools.map((tool) => (
            <a
              key={tool._id}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                background: "var(--glass-bg)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "1rem",
                transition: "all 0.3s ease",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                {tool.logo.startsWith("http") ? (
                  <img src={tool.logo} alt={tool.name} style={{ width: "48px", height: "48px", borderRadius: "0.5rem", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                    {tool.logo}
                  </div>
                )}
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  {tool.name}
                </h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5, flex: 1, margin: 0, marginBottom: "1.5rem" }}>
                {tool.description}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", fontSize: "0.875rem", fontWeight: 600, marginTop: "auto" }}>
                Visit Tool <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
