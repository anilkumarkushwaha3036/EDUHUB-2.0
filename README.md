#  EDUHUB 2.0 — Curated Learning Resource Hub

> **Stop searching. Start learning.**

EduHub 2.0 is a full-stack, curated resource platform that eliminates the chaos of scattered tutorials, blogs, and documentation. Every resource is structured, categorized, and filtered — so students spend time learning, not hunting.

 **Live Demo:** [http://35.154.53.96/](http://35.154.53.96/)

---

##  The Core Problem

Students waste hours finding quality, free learning material across YouTube, blogs, and docs — with no structure or quality filter. EduHub solves this with a single, curated hub across all major tech domains, built with a premium minimalist UI and a powerful admin CMS.

---

##  Features

###  Public Platform

| Feature | Description |
|---|---|
|  Skill Categories | Web Dev, AI/ML, Data Science, DSA, DevOps, and more |
|  Advanced Filtering | Filter by Type (YouTube / Docs / Practice) and Level (Beginner → Advanced) |
|  Full-Text Search | Instant search across titles, descriptions, and tags |
|  Premium UI | Dark blue minimal theme, Framer Motion animations, glassmorphism |

###  Admin CMS Panel

| Feature | Description |
|---|---|
|  Secure Auth | JWT-based admin login with protected routes |
|  Full CRUD | Manage skills, resource types, and resources via Next.js API Routes |

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) — Frontend + Backend API Routes |
| Language | TypeScript |
| Database | MongoDB Atlas + Mongoose |
| Styling | Tailwind CSS + Vanilla CSS |
| DevOps | Docker (multi-stage, standalone output), AWS EC2 |

---

##  Deployment — Docker + AWS EC2

This project uses a **multi-stage Dockerfile** optimized for Next.js `standalone` output — producing a lightweight, production-ready image.

```bash
# Build production image (bakes in .env.local)
npm run docker:build

# Push to Docker Hub
npm run docker:push
```

**On AWS EC2:**
```bash
# Pull latest image
docker pull your-username/eduhub:latest

# Run on port 80
docker run -d -p 80:3000 --name eduhub your-username/eduhub:latest
```

> Access via EC2 Public IP using `http://` (not `https://`).

---

##  Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/eduhub.git
cd eduhub

# Install all dependencies
npm run install:all

# Run dev server
npm run dev
# → http://localhost:3000
```

**Create `frontend/.env.local`:**
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

---

##  Future Roadmap

- [ ] **User Accounts** — Personalized dashboards with bookmarked resources
- [ ] **Community Ratings** — Peer-reviewed resource quality scores
- [ ] **Skill Roadmaps** — Visual, step-by-step learning paths per domain
- [ ] **Contributor Mode** — Let community members submit and suggest resources
- [ ] **Mobile App** — React Native version for on-the-go learning

---

##  Prerequisites

- Node.js v18+
- MongoDB Atlas connection string
- Docker (for production deployment)

---
