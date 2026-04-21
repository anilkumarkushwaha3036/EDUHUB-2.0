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
} from "lucide-react";
import {
  adminFetchResources,
  adminDeleteResource,
  fetchSkills,
  fetchResourceTypes,
  adminCreateResource,
  adminUpdateResource,
  fetchAdminMe,
} from "@/lib/api";
import { Resource, Skill, ResourceType, ResourceLevel } from "@/types";

export default function AdminDashboardClient() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
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
    Promise.all([adminFetchResources(), fetchSkills(), fetchResourceTypes()])
      .then(([res, s, t]) => {
        setResources(res.data);
        setTotal(res.total);
        setSkills(s);
        setTypes(t);
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
            style={{
              padding: "0.625rem 0.875rem",
              borderRadius: "0.25rem",
              background: "rgba(59,130,246,0.15)",
              color: "#60a5fa",
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <Layers size={15} /> Resources
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
              Resources
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              {total} total resources
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={openCreate}
            id="admin-add-resource"
          >
            <Plus size={16} /> Add Resource
          </button>
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
        ) : (
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
        )}
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
    </div>
  );
}
