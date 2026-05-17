"use client";

import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/api";
import { Blog } from "@/types";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogsClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
          Loading Blogs...
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)", background: "var(--glass-bg)", borderRadius: "1rem", border: "1px solid var(--border-subtle)" }}>
          No blogs available right now.
        </div>
      ) : (
        <div className="grid-blogs">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--glass-bg)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "0.75rem",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "var(--shadow-sm)",
                height: "300px",
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
              <div style={{ width: "100%", height: "120px", overflow: "hidden" }}>
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              
              <div style={{ padding: "0.875rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {blog.author && (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      <User size={10} /> {blog.author}
                    </span>
                  )}
                  {blog.date && (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      <Calendar size={10} /> {blog.date}
                    </span>
                  )}
                </div>
                
                <h2 style={{ 
                  fontSize: "1rem", 
                  fontWeight: 700, 
                  color: "var(--text-primary)", 
                  marginBottom: "0.5rem", 
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {blog.title}
                </h2>
                
                <p style={{ 
                  color: "var(--text-secondary)", 
                  fontSize: "0.825rem", 
                  lineHeight: 1.4, 
                  marginBottom: "0.75rem", 
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {blog.details}
                </p>
                
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    textDecoration: "none",
                    width: "100%",
                    padding: "0.4rem 1rem",
                    fontSize: "0.8rem",
                    borderRadius: "0.375rem"
                  }}
                >
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      <style>{`
        .grid-blogs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 991px) {
          .grid-blogs {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .grid-blogs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
