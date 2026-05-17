# EDUHUB 2.0 — Curated Learning Resource Hub
Stop searching. Start learning.

EduHub 2.0 is a full-stack, curated resource platform that eliminates the chaos of scattered tutorials, blogs, and documentation. Every resource is structured, categorized, and filtered — so students spend time learning, not hunting.

**Live Demo**: http://13.201.41.237/

---

## The Core Problem
Students waste hours finding quality, free learning material across YouTube, blogs, and docs — with no structure or quality filter. EduHub solves this with a single, curated hub across all major tech domains, built with a premium minimalist UI and a powerful admin CMS.

---

## Features

### Public Platform
| Feature | Description |
| :--- | :--- |
| **Skill Categories** | Web Dev, AI/ML, Data Science, DSA, DevOps, and more |
| **Advanced Filtering** | Filter by Type (YouTube / Docs / Practice) and Level (Beginner → Advanced) |
| **Full-Text Search** | Instant search across titles, descriptions, and tags |
| **AI Tools Catalog** | Dedicated listing of premium AI tools and utilities for modern developers |
| **Tech Blogs Hub** | Compact grid displaying exactly 6 curated developer articles in a beautiful viewport fold |
| **Premium UI** | Dark blue minimal theme, Framer Motion animations, Lenis smooth scroll, glassmorphism |

### Admin CMS Panel
| Feature | Description |
| :--- | :--- |
| **Secure Auth** | JWT-based admin login with protected routes and dynamic `.env.local` credentials sync |
| **Full CRUD** | Manage skills, resource types, resources, AI tools, and tech blogs via Next.js API Routes using slide-over sheets |

---

## Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) — Frontend + Backend API Routes |
| **Language** | TypeScript |
| **Database** | MongoDB Atlas + Mongoose |
| **Styling & UI** | Tailwind CSS v4 + Vanilla CSS + shadcn/ui + Base UI |
| **Scroll & Motion** | Lenis Smooth Scroll + Framer Motion |
| **DevOps** | Docker (multi-stage, standalone output), AWS EC2 |

---

## 🚀 Premium Implemented Upgrades

### 1. 🤖 Dynamic AI Tools Directory (`/ai-tools`)
*   **Curated Hub & High-Fidelity UI**: Built a brand new sub-page (`/ai-tools`) populated with cutting-edge AI utilities. Cards feature custom HSL-themed glowing borders, active hover states, and direct CTA launch actions.
*   **Full CMS CRUD Integration**: Integrated directly into the secure Admin CMS Sidebar. Features responsive, animated slide-over modals allowing administrators to easily Add, Update, or Delete AI Tools in real-time on MongoDB Atlas.

### 2. 📝 Tech Blogs Grid & Viewport Optimization (`/blogs`)
*   **Compact 3x2 Viewport Fitting**: Designed a `/blogs` section with a highly optimized three-column grid where exactly **6 tech blogs** cleanly fit in a single viewport fold. Card heights are strictly locked to `300px` and the coding visual cover banners are set to `120px`.
*   **Strict Layout Clamping**: Text fields are strictly clamped (titles locked to 1 line, body highlights locked to 2 lines) at `0.825rem` font size to preserve absolute symmetry across all cards.
*   **CMS CRUD Support**: Added a dedicated management panel inside the Admin CMS with slide-over sheets for full CRUD capability.

### 3. 🌀 Lenis Smooth Scrolling Integration
*   **Fluid Scrolling Physics**: Integrated the high-performance **Lenis Smooth Scroll** engine into the core workspace layout (`src/components/LenisProvider.tsx`) for fluid, luxurious inertia scrolling.
*   **Transition Flash Optimization**: Redesigned `template.tsx` as a pure React children pass-through. This completely eliminates the `framer-motion` page-remount fade transition (`initial={{ opacity: 0 }}`) which was triggering a flashing "refresh-like" effect on page load, achieving instant page transitions perfectly integrated with Lenis.

### 4. 🎨 Next-Gen shadcn/ui & TailwindCSS v4 Setup
*   **Component Base**: Integrated the robust **shadcn/ui** and **Base UI** primitives (`class-variance-authority`, `clsx`, `tailwind-merge`) to build highly interactive, accessible, and lightweight client-side components (like our custom slide-over CRUD sheets and theme togglers).
*   **Modern Styling Architecture**: Upgraded styling compiling to **TailwindCSS v4**, leveraging nest-compatible styling rules, HSL-tailored css variable configurations, and a clean minimalist dark blue theme palette.

---

## Deployment — Docker + AWS EC2
This project uses a multi-stage Dockerfile optimized for Next.js standalone output — producing a lightweight, production-ready image.

```bash
# Build production image (bakes in .env.local)
npm run docker:build

# Push to Docker Hub
npm run docker:push
```

On AWS EC2:

```bash
# Pull latest image
docker pull your-username/eduhub:latest

# Run on port 80
docker run -d -p 80:3000 --name eduhub your-username/eduhub:latest
```
Access via EC2 Public IP using http:// (not https://).

---

## Local Development
```bash
# Clone the repo
git clone https://github.com/your-username/eduhub.git
cd eduhub

# Install all dependencies
npm run install:all

# Seed the database (populates Skills, Resources, AI Tools, Blogs, and Admin)
npm run seed

# Run dev server
npm run dev
# → http://localhost:3000
```

Create `.env.local`:
```ini
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

---

## Future Roadmap
* [ ] **User Accounts** — Personalized dashboards with bookmarked resources
* [ ] **Community Ratings** — Peer-reviewed resource quality scores
* [ ] **Skill Roadmaps** — Visual, step-by-step learning paths per domain
* [ ] **Contributor Mode** — Let community members submit and suggest resources
* [ ] **Mobile App** — React Native version for on-the-go learning

---

## 🧪 Testing & Quality Assurance
The platform has been audited using a rigorous functional, database, visual, and DevOps container testing suite.
For a complete, granular list of all manual/automated test cases and their execution statuses, please refer to our dedicated **[Testing Protocol File](../testing.md)**.

---

## Prerequisites
* Node.js v18+
* MongoDB Atlas connection string
* Docker (for production deployment)
