# 🚀 EDUHUB 2.0

<div align="center">
  <img src="frontend/public/favicon.ico" alt="EduHub Logo" width="80" height="80" />
  <p><strong>The centralized hub for curated, structured, and free learning resources across all tech domains.</strong></p>

  [![AWS EC2 Deployed](https://img.shields.io/badge/Deployed_on-AWS_EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](http://35.154.53.96/)
  [![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/)

  <h3>🟢 LIVE DEMO: <a href="http://35.154.53.96/">http://35.154.53.96/</a></h3>
</div>

---

## 📖 About EduHub 2.0

EduHub solves the common problem students face: wasting hours trying to find quality, free learning materials. By providing a **curated, structured, and categorized resource hub**, EduHub eliminates the overwhelm of infinite YouTube tutorials, scattered blogs, and confusing documentation. 

With a premium minimalist aesthetic, powerful search functionality, and an integrated Admin Content Management System (CMS), EduHub scales from a minimal viable product to a bustling community-driven platform.

## ✨ Features

### 🎓 Public Platform
- **Curated Skill Categories:** Explore topics like Web Development, AI & Machine Learning, Data Science, DSA, DevOps, and more.
- **Advanced Filtering:** Filter resources by **Type** (YouTube, Documentation, Practice) and **Level** (Beginner, Intermediate, Advanced).
- **Lightning Fast Search:** Quick full-text search across titles, descriptions, and tags.
- **Stunning UI/UX:** Built with a premium Dark Blue minimal theme, smooth Framer Motion animations, and responsive glassmorphism.

### ⚙️ Admin CMS Panel
- **Secure Authentication:** JWT-based login system for administrators.
- **Resource Management:** Full CRUD (Create, Read, Update, Delete) capability for skills, resource types, and resources via Next.js API Routes.

---

## 🛠️ Technology Stack

EduHub is a unified full-stack application.
- **Framework:** [Next.js 16 App Router](https://nextjs.org/) (Frontend & Backend API Routes)
- **Language:** TypeScript
- **Database:** [MongoDB Atlas](https://www.mongodb.com/) + Mongoose
- **Styling:** Vanilla CSS + Tailwind CSS
- **Deployment:** Docker & AWS EC2 

---

## 🐳 Docker Deployment (AWS EC2)

This project is fully containerized using a multi-stage Dockerfile optimized for Next.js `standalone` output, making it extremely lightweight and perfect for AWS EC2.

### 1. Build & Push Locally
Run the following commands using the root `package.json` scripts:
```bash
# Builds the production image (bakes in .env.local)
npm run docker:build

# Pushes the image to Docker Hub
npm run docker:push
```

### 2. Run on AWS EC2
SSH into your EC2 instance and run:
```bash
# Pull the latest image
docker pull your-username/eduhub:latest

# Run the container on port 80 (accessible via Public IP)
docker run -d -p 80:3000 --name eduhub your-username/eduhub:latest
```
Now access the site using your EC2's Public IP address in any browser (ensure you use `http://` and not `https://`).

---

## 🚀 Local Development

If you wish to run the project locally without Docker:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/eduhub.git
cd eduhub
```

### 2. Install & Configure
Install all frontend dependencies:
```bash
npm run install:all
```

Create a `.env.local` file inside the `frontend/` directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### 3. Run Development Server
```bash
npm run dev
# The app will run on http://localhost:3000
```

---

## 🤝 Next Steps / Future Scope
- ✨ User login and personalized dashboards (Bookmarks).
- 🏆 Community rating and review system.
- 🗺️ Skill-specific roadmaps.

---
