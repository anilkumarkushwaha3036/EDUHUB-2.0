"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Pencil,
  LogOut,
  BookOpen,
  Layers,
  Zap,
  X,
  Check,
  Cpu,
  FileText,
} from "lucide-react";
import {
  adminFetchResources,
  adminDeleteResource,
  fetchSkills,
  fetchResourceTypes,
  adminCreateResource,
  adminUpdateResource,
  fetchAdminMe,
  adminCreateSkill,
  adminUpdateSkill,
  adminDeleteSkill,
  fetchAITools,
  adminCreateAITool,
  adminUpdateAITool,
  adminDeleteAITool,
  fetchBlogs,
  adminCreateBlog,
  adminUpdateBlog,
  adminDeleteBlog,
} from "@/lib/api";
import { Resource, Skill, ResourceType, ResourceLevel, AITool, Blog } from "@/types";

export default function AdminDashboardClient() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState<"resources" | "skills" | "ai-tools" | "blogs">("resources");

  // Resources state
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    skillId: "",
    typeId: "",
    level: "beginner" as ResourceLevel,
    tags: "",
    isFeatured: false,
    isApproved: true,
  });

  // Skills state
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    slug: "",
    icon: "",
    description: "",
  });

  // AI Tools state
  const [showAiToolForm, setShowAiToolForm] = useState(false);
  const [editingAiTool, setEditingAiTool] = useState<AITool | null>(null);
  const [aiToolFormData, setAiToolFormData] = useState({
    name: "",
    description: "",
    logo: "",
    link: "",
  });

  // Blogs state
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    coverImage: "",
    details: "",
    link: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("eduhub_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchAdminMe()
      .then(() => setAuthed(true))
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  useEffect(() => {
    if (!authed) return;
    Promise.all([
      adminFetchResources(), 
      fetchSkills(), 
      fetchResourceTypes(),
      fetchAITools(),
      fetchBlogs()
    ])
      .then(([res, s, t, a, b]) => {
        setResources(res.data);
        setTotal(res.total);
        setSkills(s);
        setTypes(t);
        setAiTools(a);
        setBlogs(b);
      })
      .finally(() => setLoading(false));
  }, [authed]);

  const logout = () => {
    localStorage.removeItem("eduhub_token");
    router.push("/admin/login");
  };

  const openCreate = () => {
    setEditingResource(null);
    setFormData({
      title: "",
      link: "",
      description: "",
      skillId: "",
      typeId: "",
      level: "beginner" as ResourceLevel,
      tags: "",
      isFeatured: false,
      isApproved: true,
    });
    setShowForm(true);
  };
  const openEdit = (r: Resource) => {
    setEditingResource(r);
    setFormData({
      title: r.title,
      link: r.link,
      description: r.description,
      skillId: (r.skillId as any)._id || (r.skillId as any),
      typeId: (r.typeId as any)._id || (r.typeId as any),
      level: r.level,
      tags: r.tags.join(", "),
      isFeatured: r.isFeatured,
      isApproved: r.isApproved,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resource?")) return;
    await adminDeleteResource(id);
    setResources((prev) => prev.filter((r) => r._id !== id));
    setTotal((t) => t - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editingResource) {
        const updated = await adminUpdateResource(editingResource._id, payload);
        setResources((prev) =>
          prev.map((r) => (r._id === updated._id ? updated : r)),
        );
        setMsg("✅ Resource updated!");
      } else {
        const created = await adminCreateResource(payload);
        setResources((prev) => [created, ...prev]);
        setTotal((t) => t + 1);
        setMsg("✅ Resource created!");
      }
      setShowForm(false);
    } catch (err: any) {
      setMsg(`❌ ${err.response?.data?.message || "Error"}`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const openSkillCreate = () => {
    setEditingSkill(null);
    setSkillFormData({ name: "", slug: "", icon: "", description: "" });
    setShowSkillForm(true);
  };
  const openSkillEdit = (s: Skill) => {
    setEditingSkill(s);
    setSkillFormData({
      name: s.name,
      slug: s.slug,
      icon: s.icon,
      description: s.description,
    });
    setShowSkillForm(true);
  };

  const handleSkillDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await adminDeleteSkill(id);
    setSkills((prev) => prev.filter((s) => s._id !== id));
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingSkill) {
        const updated = await adminUpdateSkill(editingSkill._id, skillFormData);
        setSkills((prev) =>
          prev.map((s) => (s._id === updated._id ? updated : s)),
        );
        setMsg("✅ Skill updated!");
      } else {
        const created = await adminCreateSkill(skillFormData);
        setSkills((prev) => [...prev, created]);
        setMsg("✅ Skill created!");
      }
      setShowSkillForm(false);
    } catch (err: any) {
      setMsg(`❌ ${err.response?.data?.message || "Error"}`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  // AI Tools Handlers
  const openAiToolCreate = () => {
    setEditingAiTool(null);
    setAiToolFormData({ name: "", description: "", logo: "", link: "" });
    setShowAiToolForm(true);
  };
  const openAiToolEdit = (a: AITool) => {
    setEditingAiTool(a);
    setAiToolFormData({
      name: a.name,
      description: a.description,
      logo: a.logo,
      link: a.link,
    });
    setShowAiToolForm(true);
  };

  const handleAiToolDelete = async (id: string) => {
    if (!confirm("Delete this AI Tool?")) return;
    await adminDeleteAITool(id);
    setAiTools((prev) => prev.filter((a) => a._id !== id));
  };

  const handleAiToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingAiTool) {
        const updated = await adminUpdateAITool(editingAiTool._id, aiToolFormData);
        setAiTools((prev) =>
          prev.map((a) => (a._id === updated._id ? updated : a)),
        );
        setMsg("✅ AI Tool updated!");
      } else {
        const created = await adminCreateAITool(aiToolFormData);
        setAiTools((prev) => [created, ...prev]);
        setMsg("✅ AI Tool created!");
      }
      setShowAiToolForm(false);
    } catch (err: any) {
      setMsg(`❌ ${err.response?.data?.message || "Error"}`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  // Blogs Handlers
  const openBlogCreate = () => {
    setEditingBlog(null);
    setBlogFormData({ title: "", coverImage: "", details: "", link: "" });
    setShowBlogForm(true);
  };
  const openBlogEdit = (b: Blog) => {
    setEditingBlog(b);
    setBlogFormData({
      title: b.title,
      coverImage: b.coverImage,
      details: b.details,
      link: b.link,
    });
    setShowBlogForm(true);
  };

  const handleBlogDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await adminDeleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingBlog) {
        const updated = await adminUpdateBlog(editingBlog._id, blogFormData);
        setBlogs((prev) =>
          prev.map((b) => (b._id === updated._id ? updated : b)),
        );
        setMsg("✅ Blog updated!");
      } else {
        const created = await adminCreateBlog(blogFormData);
        setBlogs((prev) => [created, ...prev]);
        setMsg("✅ Blog created!");
      }
      setShowBlogForm(false);
    } catch (err: any) {
      setMsg(`❌ ${err.response?.data?.message || "Error"}`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  if (!authed)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
        }}
      >
        Authenticating...
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "var(--glass-bg-strong)",
          borderRight: "1px solid rgba(59,130,246,0.1)",
          padding: "1.5rem",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "0.25rem",
              background: "linear-gradient(135deg,#2563eb,#06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} color="white" fill="white" />
          </div>
          <span
            style={{
              fontWeight: 800,
              color: "var(--text-primary)",
              fontSize: "1rem",
            }}
          >
            EduHub CMS
          </span>
        </div>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.375rem",
            flex: 1,
          }}
        >
          <span
            onClick={() => setActiveTab("resources")}
            style={{
              padding: "0.625rem 0.875rem",
              borderRadius: "0.25rem",
              background: activeTab === "resources" ? "rgba(59,130,246,0.15)" : "transparent",
              color: activeTab === "resources" ? "#60a5fa" : "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <Layers size={15} /> Resources
          </span>
          <span
            onClick={() => setActiveTab("skills")}
            style={{
              padding: "0.625rem 0.875rem",
              borderRadius: "0.25rem",
              background: activeTab === "skills" ? "rgba(59,130,246,0.15)" : "transparent",
              color: activeTab === "skills" ? "#60a5fa" : "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <BookOpen size={15} /> Skills
          </span>
          <span
            onClick={() => setActiveTab("ai-tools")}
            style={{
              padding: "0.625rem 0.875rem",
              borderRadius: "0.25rem",
              background: activeTab === "ai-tools" ? "rgba(59,130,246,0.15)" : "transparent",
              color: activeTab === "ai-tools" ? "#60a5fa" : "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <Cpu size={15} /> AI Tools
          </span>
          <span
            onClick={() => setActiveTab("blogs")}
            style={{
              padding: "0.625rem 0.875rem",
              borderRadius: "0.25rem",
              background: activeTab === "blogs" ? "rgba(59,130,246,0.15)" : "transparent",
              color: activeTab === "blogs" ? "#60a5fa" : "var(--text-secondary)",
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <FileText size={15} /> Blogs
          </span>
        </nav>
        <button
          onClick={logout}
          className="btn-secondary"
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {activeTab === "resources" && "Resources"}
              {activeTab === "skills" && "Skills"}
              {activeTab === "ai-tools" && "AI Tools"}
              {activeTab === "blogs" && "Blogs"}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              {activeTab === "resources" && `${total} total resources`}
              {activeTab === "skills" && `${skills.length} total skills`}
              {activeTab === "ai-tools" && `${aiTools.length} total AI tools`}
              {activeTab === "blogs" && `${blogs.length} total blogs`}
            </p>
          </div>
          {activeTab === "resources" && (
            <button
              className="btn-primary"
              onClick={openCreate}
              id="admin-add-resource"
            >
              <Plus size={16} /> Add Resource
            </button>
          )}
          {activeTab === "skills" && (
            <button
              className="btn-primary"
              onClick={openSkillCreate}
            >
              <Plus size={16} /> Add Skill
            </button>
          )}
          {activeTab === "ai-tools" && (
            <button
              className="btn-primary"
              onClick={openAiToolCreate}
            >
              <Plus size={16} /> Add AI Tool
            </button>
          )}
          {activeTab === "blogs" && (
            <button
              className="btn-primary"
              onClick={openBlogCreate}
            >
              <Plus size={16} /> Add Blog
            </button>
          )}
        </div>

        {msg && (
          <div
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "0.375rem",
              padding: "0.75rem 1rem",
              marginBottom: "1.5rem",
              color: "#34d399",
              fontSize: "0.875rem",
            }}
          >
            {msg}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div
            style={{
              color: "var(--text-muted)",
              textAlign: "center",
              padding: "4rem",
            }}
          >
            Loading...
          </div>
        ) : activeTab === "resources" ? (
          <div
            style={{
              background: "var(--glass-bg)",
              border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
                  {[
                    "Title",
                    "Skill",
                    "Type",
                    "Level",
                    "Featured",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resources.map((r, i) => (
                  <tr
                    key={r._id}
                    style={{
                      borderBottom: "1px solid rgba(59,130,246,0.06)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(59,130,246,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                          maxWidth: "260px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.title}
                      </div>
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {(r.skillId as any)?.name}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <span
                        className={`badge type-badge-${(r.typeId as any)?.slug}`}
                      >
                        {(r.typeId as any)?.name}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <span className={`badge badge-${r.level}`}>
                        {r.level}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      {r.isFeatured ? (
                        <Check size={16} color="#34d399" />
                      ) : (
                        <X size={16} color="var(--text-muted)" />
                      )}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => openEdit(r)}
                          style={{
                            background: "var(--border-subtle)",
                            border: "1px solid rgba(59,130,246,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#60a5fa",
                            transition: "all 0.2s",
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(r._id)}
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#f87171",
                            transition: "all 0.2s",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "skills" ? (
          <div
            style={{
              background: "var(--glass-bg)",
              border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
                  {["Name", "Slug", "Icon", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {skills.map((s) => (
                  <tr
                    key={s._id}
                    style={{
                      borderBottom: "1px solid rgba(59,130,246,0.06)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(59,130,246,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {s.name}
                      </div>
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                      {s.slug}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                      {s.icon}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => openSkillEdit(s)}
                          style={{
                            background: "var(--border-subtle)",
                            border: "1px solid rgba(59,130,246,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#60a5fa",
                            transition: "all 0.2s",
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleSkillDelete(s._id)}
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#f87171",
                            transition: "all 0.2s",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "ai-tools" ? (
          <div
            style={{
              background: "var(--glass-bg)",
              border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
                  {["Logo", "Name", "Description", "Link", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aiTools.map((a) => (
                  <tr
                    key={a._id}
                    style={{
                      borderBottom: "1px solid rgba(59,130,246,0.06)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(59,130,246,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      {a.logo.startsWith("http") ? (
                        <img src={a.logo} alt={a.name} style={{ width: "32px", height: "32px", borderRadius: "0.25rem", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: "1.25rem" }}>{a.logo}</span>
                      )}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                      {a.name}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", color: "var(--text-muted)", fontSize: "0.875rem", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {a.description}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", color: "#60a5fa", fontSize: "0.875rem", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{a.link}</a>
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => openAiToolEdit(a)}
                          style={{
                            background: "var(--border-subtle)",
                            border: "1px solid rgba(59,130,246,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#60a5fa",
                            transition: "all 0.2s",
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleAiToolDelete(a._id)}
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#f87171",
                            transition: "all 0.2s",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === "blogs" ? (
          <div
            style={{
              background: "var(--glass-bg)",
              border: "1px solid rgba(59,130,246,0.12)",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
                  {["Cover", "Title", "Details", "Link", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr
                    key={b._id}
                    style={{
                      borderBottom: "1px solid rgba(59,130,246,0.06)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(59,130,246,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <img src={b.coverImage} alt={b.title} style={{ width: "48px", height: "32px", borderRadius: "0.25rem", objectFit: "cover" }} />
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.875rem", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {b.title}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", color: "var(--text-muted)", fontSize: "0.875rem", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {b.details}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", color: "#60a5fa", fontSize: "0.875rem", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <a href={b.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{b.link}</a>
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => openBlogEdit(b)}
                          style={{
                            background: "var(--border-subtle)",
                            border: "1px solid rgba(59,130,246,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#60a5fa",
                            transition: "all 0.2s",
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleBlogDelete(b._id)}
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: "0.625rem",
                            padding: "0.375rem",
                            cursor: "pointer",
                            color: "#f87171",
                            transition: "all 0.2s",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      {/* Slide-over Form Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--bg-primary-transparent)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setShowForm(false)}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "relative",
              zIndex: 1,
              background: "var(--glass-bg-strong)",
              borderLeft: "1px solid rgba(59,130,246,0.2)",
              width: "480px",
              height: "100vh",
              overflowY: "auto",
              padding: "2rem",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.75rem",
              }}
            >
              <h2
                style={{
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontSize: "1.25rem",
                }}
              >
                {editingResource ? "Edit Resource" : "Add Resource"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  label: "Title",
                  key: "title",
                  type: "text",
                  placeholder: "Resource title",
                  required: true,
                },
                {
                  label: "URL / Link",
                  key: "link",
                  type: "url",
                  placeholder: "https://...",
                  required: true,
                },
              ].map(({ label, key, type, placeholder, required }) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontWeight: 600,
                      marginBottom: "0.375rem",
                      display: "block",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={(formData as any)[key]}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="input"
                    required={required}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    marginBottom: "0.375rem",
                    display: "block",
                  }}
                >
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Brief description..."
                  className="input"
                  rows={3}
                  style={{ resize: "vertical" }}
                  required
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.875rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontWeight: 600,
                      marginBottom: "0.375rem",
                      display: "block",
                    }}
                  >
                    Skill
                  </label>
                  <select
                    value={formData.skillId}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, skillId: e.target.value }))
                    }
                    className="input"
                    required
                  >
                    <option value="">Select skill</option>
                    {skills.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontWeight: 600,
                      marginBottom: "0.375rem",
                      display: "block",
                    }}
                  >
                    Type
                  </label>
                  <select
                    value={formData.typeId}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, typeId: e.target.value }))
                    }
                    className="input"
                    required
                  >
                    <option value="">Select type</option>
                    {types.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    marginBottom: "0.375rem",
                    display: "block",
                  }}
                >
                  Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, level: e.target.value as ResourceLevel }))
                  }
                  className="input"
                >
                  <option value="beginner">🟢 Beginner</option>
                  <option value="intermediate">🟡 Intermediate</option>
                  <option value="advanced">🔴 Advanced</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    marginBottom: "0.375rem",
                    display: "block",
                  }}
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, tags: e.target.value }))
                  }
                  placeholder="react, hooks, frontend"
                  className="input"
                />
              </div>

              <div style={{ display: "flex", gap: "1.25rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        isFeatured: e.target.checked,
                      }))
                    }
                  />
                  ⭐ Featured
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.isApproved}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        isApproved: e.target.checked,
                      }))
                    }
                  />
                  ✅ Approved
                </label>
              </div>

              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowForm(false)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting
                    ? "Saving..."
                    : editingResource
                      ? "Update"
                      : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Slide-over Skill Form Modal */}
      {showSkillForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--bg-primary-transparent)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setShowSkillForm(false)}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "relative",
              zIndex: 1,
              background: "var(--glass-bg-strong)",
              borderLeft: "1px solid rgba(59,130,246,0.2)",
              width: "480px",
              height: "100vh",
              overflowY: "auto",
              padding: "2rem",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.75rem",
              }}
            >
              <h2
                style={{
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontSize: "1.25rem",
                }}
              >
                {editingSkill ? "Edit Skill" : "Add Skill"}
              </h2>
              <button
                onClick={() => setShowSkillForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSkillSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  label: "Name",
                  key: "name",
                  type: "text",
                  placeholder: "Web Development",
                  required: true,
                },
                {
                  label: "Slug",
                  key: "slug",
                  type: "text",
                  placeholder: "web-development",
                  required: true,
                },
                {
                  label: "Icon (Lucide name)",
                  key: "icon",
                  type: "text",
                  placeholder: "Code",
                  required: true,
                },
              ].map(({ label, key, type, placeholder, required }) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontWeight: 600,
                      marginBottom: "0.375rem",
                      display: "block",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={(skillFormData as any)[key]}
                    onChange={(e) =>
                      setSkillFormData((p) => ({ ...p, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="input"
                    required={required}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    marginBottom: "0.375rem",
                    display: "block",
                  }}
                >
                  Description
                </label>
                <textarea
                  value={skillFormData.description}
                  onChange={(e) =>
                    setSkillFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Brief description..."
                  className="input"
                  rows={3}
                  style={{ resize: "vertical" }}
                  required
                />
              </div>

              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowSkillForm(false)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting
                    ? "Saving..."
                    : editingSkill
                      ? "Update"
                      : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {/* Slide-over AI Tool Form Modal */}
      {showAiToolForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--bg-primary-transparent)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setShowAiToolForm(false)}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "relative",
              zIndex: 1,
              background: "var(--glass-bg-strong)",
              borderLeft: "1px solid rgba(59,130,246,0.2)",
              width: "480px",
              height: "100vh",
              overflowY: "auto",
              padding: "2rem",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.75rem",
              }}
            >
              <h2
                style={{
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontSize: "1.25rem",
                }}
              >
                {editingAiTool ? "Edit AI Tool" : "Add AI Tool"}
              </h2>
              <button
                onClick={() => setShowAiToolForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleAiToolSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  label: "Name",
                  key: "name",
                  type: "text",
                  placeholder: "ChatGPT",
                  required: true,
                },
                {
                  label: "Logo (emoji or image URL)",
                  key: "logo",
                  type: "text",
                  placeholder: "🤖",
                  required: true,
                },
                {
                  label: "Link (URL)",
                  key: "link",
                  type: "url",
                  placeholder: "https://chatgpt.com",
                  required: true,
                },
              ].map(({ label, key, type, placeholder, required }) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontWeight: 600,
                      marginBottom: "0.375rem",
                      display: "block",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={(aiToolFormData as any)[key]}
                    onChange={(e) =>
                      setAiToolFormData((p) => ({ ...p, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="input"
                    required={required}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    marginBottom: "0.375rem",
                    display: "block",
                  }}
                >
                  Description
                </label>
                <textarea
                  value={aiToolFormData.description}
                  onChange={(e) =>
                    setAiToolFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Brief description..."
                  className="input"
                  rows={3}
                  style={{ resize: "vertical" }}
                  required
                />
              </div>

              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAiToolForm(false)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting
                    ? "Saving..."
                    : editingAiTool
                      ? "Update"
                      : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Slide-over Blog Form Modal */}
      {showBlogForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--bg-primary-transparent)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setShowBlogForm(false)}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "relative",
              zIndex: 1,
              background: "var(--glass-bg-strong)",
              borderLeft: "1px solid rgba(59,130,246,0.2)",
              width: "480px",
              height: "100vh",
              overflowY: "auto",
              padding: "2rem",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.75rem",
              }}
            >
              <h2
                style={{
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontSize: "1.25rem",
                }}
              >
                {editingBlog ? "Edit Blog" : "Add Blog"}
              </h2>
              <button
                onClick={() => setShowBlogForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleBlogSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  label: "Title",
                  key: "title",
                  type: "text",
                  placeholder: "Exploring the Future of React",
                  required: true,
                },
                {
                  label: "Cover Image URL",
                  key: "coverImage",
                  type: "url",
                  placeholder: "https://images.unsplash.com/...",
                  required: true,
                },
                {
                  label: "Read More Link (URL)",
                  key: "link",
                  type: "url",
                  placeholder: "https://dev.to/...",
                  required: true,
                },
              ].map(({ label, key, type, placeholder, required }) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      fontWeight: 600,
                      marginBottom: "0.375rem",
                      display: "block",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={(blogFormData as any)[key]}
                    onChange={(e) =>
                      setBlogFormData((p) => ({ ...p, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="input"
                    required={required}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    marginBottom: "0.375rem",
                    display: "block",
                  }}
                >
                  Details / Short Description
                </label>
                <textarea
                  value={blogFormData.details}
                  onChange={(e) =>
                    setBlogFormData((p) => ({ ...p, details: e.target.value }))
                  }
                  placeholder="Short summary of the blog post..."
                  className="input"
                  rows={3}
                  style={{ resize: "vertical" }}
                  required
                />
              </div>

              <div
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowBlogForm(false)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting
                    ? "Saving..."
                    : editingBlog
                      ? "Update"
                      : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
