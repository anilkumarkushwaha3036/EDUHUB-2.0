const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read environment variables directly from .env.local
const bcrypt = require('bcryptjs');

function getEnvVal(key, defaultVal = '') {
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const regex = new RegExp(`${key}\\s*=\\s*(.*)`);
      const match = content.match(regex);
      if (match && match[1]) {
        return match[1].trim().replace(/['"]/g, '');
      }
    }
  } catch (e) {
    console.error(`Error reading ${key} from .env.local:`, e);
  }
  return defaultVal;
}

const MONGODB_URI = getEnvVal('MONGODB_URI', 'mongodb://localhost:27017/eduhub');
console.log(`Connecting to database: ${MONGODB_URI}...`);

// Define local schemas for seeding
const ResourceTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: '📄' },
  color: { type: String, default: 'blue' }
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: '📚' },
  description: { type: String, required: true },
  color: { type: String, default: 'blue' },
  resourceCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResourceType', required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  tags: [{ type: String }],
  isApproved: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const AIToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  link: { type: String, required: true }
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  details: { type: String, required: true },
  link: { type: String, required: true }
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
}, { timestamps: true });

AdminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

const ResourceType = mongoose.model('ResourceType', ResourceTypeSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Resource = mongoose.model('Resource', ResourceSchema);
const AITool = mongoose.model('AITool', AIToolSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const Admin = mongoose.model('Admin', AdminSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully to MongoDB.");

    // Clean up existing collections
    console.log("Clearing existing collections...");
    await ResourceType.deleteMany({});
    await Skill.deleteMany({});
    await Resource.deleteMany({});
    await AITool.deleteMany({});
    await Blog.deleteMany({});
    await Admin.deleteMany({});
    console.log("Collections cleared successfully.");

    // 1. Seed Resource Types (Categories)
    console.log("Seeding Resource Types...");
    const resourceTypesData = [
      { name: "Course", slug: "course", icon: "🎓", color: "blue" },
      { name: "Video", slug: "video", icon: "🎥", color: "red" },
      { name: "Book", slug: "book", icon: "📖", color: "green" },
      { name: "Article", slug: "article", icon: "📄", color: "orange" },
      { name: "Documentation", slug: "documentation", icon: "🛠️", color: "gray" }
    ];
    const createdTypes = await ResourceType.create(resourceTypesData);
    console.log(`Seeded ${createdTypes.length} Resource Types.`);

    // Helper to find type id by slug
    const getTypeId = (slug) => createdTypes.find(t => t.slug === slug)._id;

    // 2. Seed Skills
    console.log("Seeding Skills...");
    const skillsData = [
      {
        name: "Web Development",
        slug: "web-dev",
        icon: "🌐",
        description: "Learn HTML, CSS, JavaScript, React, Next.js, Node.js, and modern full-stack web architectures.",
        color: "blue",
        order: 1
      },
      {
        name: "AI & ML",
        slug: "ai-ml",
        icon: "🧠",
        description: "Dive deep into Machine Learning, Deep Learning, Neural Networks, Computer Vision, NLP, and Generative AI.",
        color: "purple",
        order: 2
      },
      {
        name: "Data Science",
        slug: "data-science",
        icon: "📊",
        description: "Master data visualization, statistics, data analytics, Pandas, NumPy, SQL, and data engineering fundamentals.",
        color: "green",
        order: 3
      },
      {
        name: "DSA",
        slug: "dsa",
        icon: "🧮",
        description: "Master core Data Structures and Algorithms, complexity analysis, and crack top-tier technical coding interviews.",
        color: "yellow",
        order: 4
      },
      {
        name: "DevOps",
        slug: "devops",
        icon: "🚀",
        description: "Learn continuous integration, Docker, Kubernetes, CI/CD pipelines, AWS, cloud computing, and infrastructure as code.",
        color: "orange",
        order: 5
      },
      {
        name: "Cybersecurity",
        slug: "cybersecurity",
        icon: "🛡️",
        description: "Learn network security, ethical hacking, vulnerability assessment, penetration testing, and digital forensics.",
        color: "red",
        order: 6
      }
    ];
    const createdSkills = await Skill.create(skillsData);
    console.log(`Seeded ${createdSkills.length} Skills.`);

    // Helper to find skill id by slug
    const getSkillId = (slug) => createdSkills.find(s => s.slug === slug)._id;

    // 3. Seed Resources
    console.log("Seeding Resources...");
    const resourcesData = [
      // Web Dev
      {
        title: "Full Stack Open 2026",
        link: "https://fullstackopen.com/en/",
        description: "The ultimate modern web development course by University of Helsinki. Learn React, Redux, Node.js, MongoDB, GraphQL, TypeScript, and Docker.",
        skillId: getSkillId("web-dev"),
        typeId: getTypeId("course"),
        level: "intermediate",
        tags: ["react", "node", "graphql", "typescript"],
        views: 2450,
        isFeatured: true
      },
      {
        title: "Eloquent JavaScript (4th Edition)",
        link: "https://eloquentjavascript.net/",
        description: "A modern introduction to programming, JavaScript, and the wonders of digital logic. Available completely free online.",
        skillId: getSkillId("web-dev"),
        typeId: getTypeId("book"),
        level: "beginner",
        tags: ["javascript", "programming", "es6"],
        views: 1890,
        isFeatured: false
      },
      {
        title: "Next.js Official Documentation",
        link: "https://nextjs.org/docs",
        description: "Learn how to build production-ready modern React applications using Server Components, Routing, and Optimizations.",
        skillId: getSkillId("web-dev"),
        typeId: getTypeId("documentation"),
        level: "beginner",
        tags: ["nextjs", "react", "ssr", "rsc"],
        views: 3120,
        isFeatured: true
      },

      // AI & ML
      {
        title: "Practical Deep Learning for Coders",
        link: "https://course.fast.ai/",
        description: "An incredible top-rated course by fast.ai teaching deep learning, stable diffusion, and transformers with minimal mathematics.",
        skillId: getSkillId("ai-ml"),
        typeId: getTypeId("course"),
        level: "intermediate",
        tags: ["python", "deep learning", "pytorch", "fastai"],
        views: 1560,
        isFeatured: true
      },
      {
        title: "Neural Networks from Scratch in Python",
        link: "https://nnfs.io/",
        description: "A fantastic resource teaching the pure mechanics of backpropagation, activation functions, and weights math without TensorFlow/PyTorch.",
        skillId: getSkillId("ai-ml"),
        typeId: getTypeId("book"),
        level: "advanced",
        tags: ["python", "math", "neural networks"],
        views: 1240,
        isFeatured: false
      },

      // Data Science
      {
        title: "Kaggle Micro-Courses",
        link: "https://www.kaggle.com/learn",
        description: "Get practical data science skills you can apply immediately with short, interactive SQL, Pandas, and Python tutorials.",
        skillId: getSkillId("data-science"),
        typeId: getTypeId("course"),
        level: "beginner",
        tags: ["python", "pandas", "sql", "data analysis"],
        views: 2200,
        isFeatured: false
      },
      {
        title: "Python for Data Analysis",
        link: "https://wesmckinney.com/book/",
        description: "Written by Wesley McKinney, the creator of Pandas, this book is the definitive guide to modern data manipulation.",
        skillId: getSkillId("data-science"),
        typeId: getTypeId("book"),
        level: "intermediate",
        tags: ["python", "pandas", "numpy", "jupyter"],
        views: 1430,
        isFeatured: true
      },

      // DSA
      {
        title: "Algorithms (4th Edition) by Robert Sedgewick",
        link: "https://algs4.cs.princeton.edu/home/",
        description: "The classic Princeton textbook covering graph algorithms, sorting, searching, and advanced string structures.",
        skillId: getSkillId("dsa"),
        typeId: getTypeId("book"),
        level: "advanced",
        tags: ["java", "algorithms", "sorting", "graphs"],
        views: 980,
        isFeatured: false
      },
      {
        title: "NeetCode 150 Roadmap",
        link: "https://neetcode.io/practice",
        description: "A structured checklist of LeetCode problems grouped by patterns to ace big tech software engineering interviews.",
        skillId: getSkillId("dsa"),
        typeId: getTypeId("documentation"),
        level: "intermediate",
        tags: ["leetcode", "dsa", "interviewprep"],
        views: 4500,
        isFeatured: true
      },

      // DevOps
      {
        title: "Docker & Kubernetes Full Course",
        link: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        description: "A comprehensive free video course teaching container virtualization, clustering, deployment orchestration, and dev environments.",
        skillId: getSkillId("devops"),
        typeId: getTypeId("video"),
        level: "beginner",
        tags: ["docker", "kubernetes", "containers"],
        views: 2780,
        isFeatured: true
      },
      {
        title: "DevOps Roadmap 2026",
        link: "https://roadmap.sh/devops",
        description: "A step-by-step guide and interactive map detailing exactly what tools and paths to master for infrastructure engineering.",
        skillId: getSkillId("devops"),
        typeId: getTypeId("documentation"),
        level: "beginner",
        tags: ["roadmap", "ci-cd", "cloud", "aws"],
        views: 3400,
        isFeatured: false
      },

      // Cybersecurity
      {
        title: "TryHackMe Ethical Hacking",
        link: "https://tryhackme.com/",
        description: "Learn cybersecurity hands-on through highly interactive, bite-sized gamified rooms and vulnerability labs.",
        skillId: getSkillId("cybersecurity"),
        typeId: getTypeId("course"),
        level: "beginner",
        tags: ["ethical hacking", "linux", "networking", "security"],
        views: 1980,
        isFeatured: true
      }
    ];

    const createdResources = await Resource.create(resourcesData);
    console.log(`Seeded ${createdResources.length} Resources.`);

    // 4. Update the resourceCount on each Skill dynamically
    console.log("Updating Skill resourceCounts...");
    for (const skill of createdSkills) {
      const count = await Resource.countDocuments({ skillId: skill._id });
      await Skill.findByIdAndUpdate(skill._id, { resourceCount: count });
      console.log(`Updated Skill: ${skill.name} to count: ${count}`);
    }

    // 5. Seed AI Tools
    console.log("Seeding AI Tools...");
    const aiToolsData = [
      {
        name: "ChatGPT",
        logo: "🤖",
        description: "OpenAI's state-of-the-art conversational AI system, perfect for brainstorming, code completion, and direct query responses.",
        link: "https://chatgpt.com"
      },
      {
        name: "v0 by Vercel",
        logo: "⚡",
        description: "A generative UI system by Vercel that produces high-quality React, Tailwind, and HTML templates from simple text prompts.",
        link: "https://v0.dev"
      },
      {
        name: "Claude AI",
        logo: "🔮",
        description: "Anthropic's advanced model featuring excellent reasoning capabilities, deep logic understanding, and clean programming generation.",
        link: "https://claude.ai"
      },
      {
        name: "Cursor AI",
        logo: "💻",
        description: "A cutting-edge, AI-first code editor designed to help you build software faster with deep repository-level code generation.",
        link: "https://cursor.com"
      },
      {
        name: "Perplexity AI",
        logo: "🔍",
        description: "An AI-powered conversational search engine providing comprehensive, real-time citation-backed answers to complex queries.",
        link: "https://perplexity.ai"
      },
      {
        name: "Midjourney",
        logo: "🎨",
        description: "A high-performance Generative AI system that produces stunningly realistic and artistic digital graphics from descriptive prompts.",
        link: "https://midjourney.com"
      },
      {
        name: "GitHub Copilot",
        logo: "🚀",
        description: "An AI pair programmer that provides autocomplete style code suggestions directly in your editor as you write code.",
        link: "https://github.com/features/copilot"
      },
      {
        name: "Jasper AI",
        logo: "✍️",
        description: "An advanced corporate enterprise AI assistant specialized in generating high-quality SEO-optimized copy, marketing, and blogs.",
        link: "https://jasper.ai"
      }
    ];
    const createdAITools = await AITool.create(aiToolsData);
    console.log(`Seeded ${createdAITools.length} AI Tools.`);

    // 6. Seed Blogs
    console.log("Seeding Blogs...");
    const blogsData = [
      {
        title: "Mastering Next.js 15 Server Components",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        details: "An in-depth deep dive into Next.js 15 routing, React Server Components (RSC), Suspense boundaries, and optimization techniques for server-rendered web applications.",
        link: "https://nextjs.org/blog/nextjs-15"
      },
      {
        title: "The Ultimate TypeScript 5.0 Reference Guide",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        details: "Learn all about modern TypeScript features, decorators support, const type parameters, performance upgrades, and how to write extremely clean typings.",
        link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/"
      },
      {
        title: "Generative AI Patterns for Full Stack Developers",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
        details: "Discover how to integrate LLM APIs into React and Node applications, implement streaming responses, handle context state, and design delightful generative experiences.",
        link: "https://vercel.com/blog/ai-sdk"
      },
      {
        title: "Introduction to Docker Containerization",
        coverImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
        details: "Learn how to wrap your applications into secure, lightweight containers for seamless local development and automated CI/CD production deployments.",
        link: "https://www.docker.com/blog/"
      },
      {
        title: "Advanced CSS Layouts with Flexbox & CSS Grid",
        coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        details: "Unleash the full power of modern CSS. Create ultra-responsive, beautiful, fluid grids and highly dynamic user interfaces without any bloated styling frameworks.",
        link: "https://css-tricks.com/"
      },
      {
        title: "Building Microservices with Node.js and gRPC",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        details: "Step-by-step tutorial on designing lightning-fast, highly scalable, and completely decentralized microservice API clusters using gRPC, Protocol Buffers, and Node.js.",
        link: "https://grpc.io/docs/languages/node/"
      }
    ];
    const createdBlogs = await Blog.create(blogsData);
    console.log(`Seeded ${createdBlogs.length} Blogs.`);

    // 7. Seed Admin Credentials
    console.log("Seeding Admin Credentials...");
    const adminEmail = getEnvVal('ADMIN_EMAIL', 'admin@eduhub.com');
    const adminPassword = getEnvVal('ADMIN_PASSWORD', 'admin123');
    
    const createdAdmin = await Admin.create({
      email: adminEmail.toLowerCase().trim(),
      password: adminPassword
    });
    console.log(`Seeded Admin Credential: ${createdAdmin.email}`);

    console.log("DB SEEDING COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Error during database seeding:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

seed();
