# 🚀 EduHub

<div align="center">
  <img src="frontend/public/favicon.ico" alt="EduHub Logo" width="80" height="80" />
  <p><strong>The centralized hub for curated, structured, and free learning resources across all tech domains.</strong></p>
</div>

---

## 📖 About EduHub

EduHub solves the common problem students face: wasting hours trying to find quality, free learning materials. By providing a **curated, structured, and categorized resource hub**, EduHub eliminates the overwhelm of infinite YouTube tutorials, scattered blogs, and confusing documentation. 

With a premium "glassmorphism" aesthetic, powerful search functionality, and an integrated Admin Content Management System (CMS), EduHub scales from a minimal viable product to a bustling community-driven platform.

## ✨ Features

### 🎓 Public Platform
- **Curated Skill Categories:** Explore topics like Web Development, AI & Machine Learning, Data Science, DSA, DevOps, and more.
- **Advanced Filtering:** Filter resources by **Type** (YouTube, Documentation, Practice) and **Level** (Beginner, Intermediate, Advanced).
- **Lightning Fast Search:** Quick full-text search across titles, descriptions, and tags.
- **Stunning UI/UX:** Built with a premium Dark Blue theme, smooth Framer Motion animations, and responsive glassmorphism cards.
- **Performance Optimized:** Server and client components balanced using Next.js 14 App Router.

### ⚙️ Admin CMS Panel
- **Secure Authentication:** JWT-based login system for administrators.
- **Resource Management:** Full CRUD (Create, Read, Update, Delete) capability for skills, resource types, and resources.
- **Interactive Dashboard:** Managing over 50+ curated resources seamlessly through an intuitive slide-over UI.

---

## 🛠️ Technology Stack

EduHub is built as a Monorepo containing both the Frontend and Backend services.

### 🎨 Frontend (Client)
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching:** Axios
- **Icons:** Lucide React

### ⚙️ Backend (API)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Security:** Helmet, CORS, Express Rate Limit

---

## 📂 Project Structure

```text
EDUHUB/
├── frontend/           # Next.js Application
│   ├── src/
│   │   ├── app/        # Next.js App Router pages (Home, Skills, Search, Admin)
│   │   ├── components/ # Reusable UI components (Hero, Cards, Layout)
│   │   ├── lib/        # API integration (Axios client)
│   │   └── types/      # Shared TypeScript interfaces
├── backend/            # Express REST API
│   ├── src/
│   │   ├── controllers/# Business logic (Skills, Resources, Auth)
│   │   ├── models/     # Mongoose Schemas
│   │   ├── routes/     # API Endpoints
│   │   └── middleware/ # JWT Auth, Error Handler
│   ├── seed.js         # Database seeding script
│   └── server.js       # Express entry point
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone https://github.com/your-username/eduhub.git
cd eduhub
```

### 2. Backend Setup
Navigate to the backend directory, install packages, and set up environment variables:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/eduhub
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=7d
ADMIN_SEED_EMAIL=admin@eduhub.com
ADMIN_SEED_PASSWORD=Admin@123
```

Seed the database with initial curated resources:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
# The API will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install packages:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the Next.js development server:
```bash
npm run dev
# The frontend will run on http://localhost:3000
```

---

## 🔐 Default Admin Credentials
If you ran the `npm run seed` command, you can access the Admin CMS at `http://localhost:3000/admin/login` using:

- **Email:** `admin@eduhub.com`
- **Password:** `Admin@123`

---

## 🤝 Next Steps / Future Scope
- ✨ User login and personalized dashboards (Bookmarks).
- 🏆 Community rating and review system.
- 🤖 AI Recommendation Engine based on user skill level and paths.
- 🗺️ Skill-specific roadmaps.

---

<p align="center">
  Built with ❤️ for students everywhere.
</p>
