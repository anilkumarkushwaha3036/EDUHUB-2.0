require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./src/config/db');
const Skill = require('./src/models/Skill');
const ResourceType = require('./src/models/ResourceType');
const Resource = require('./src/models/Resource');
const Admin = require('./src/models/Admin');

const skills = [
  { name: 'Web Development', slug: 'web-development', icon: '🌐', color: 'blue', order: 1,
    description: 'Master HTML, CSS, JavaScript, and modern frameworks like React and Next.js to build stunning web apps.' },
  { name: 'AI & Machine Learning', slug: 'ai-ml', icon: '🤖', color: 'purple', order: 2,
    description: 'Dive into neural networks, deep learning, LLMs, and the math that powers modern AI.' },
  { name: 'Data Science', slug: 'data-science', icon: '📊', color: 'green', order: 3,
    description: 'Analyze data, build models, and extract insights using Python, Pandas, and visualization tools.' },
  { name: 'Python Programming', slug: 'python', icon: '🐍', color: 'yellow', order: 4,
    description: 'From basics to advanced Python — scripting, OOP, automation, and backend development.' },
  { name: 'DSA & Algorithms', slug: 'dsa', icon: '🧩', color: 'red', order: 5,
    description: 'Master Data Structures and Algorithms to crack coding interviews and write efficient code.' },
  { name: 'DevOps & Cloud', slug: 'devops', icon: '☁️', color: 'cyan', order: 6,
    description: 'Learn Docker, Kubernetes, CI/CD, and cloud platforms like AWS and GCP.' },
  { name: 'UI/UX Design', slug: 'ui-ux', icon: '🎨', color: 'pink', order: 7,
    description: 'Design beautiful, user-friendly interfaces using Figma, design systems, and usability principles.' },
  { name: 'Cybersecurity', slug: 'cybersecurity', icon: '🔐', color: 'orange', order: 8,
    description: 'Ethical hacking, network security, CTFs, and protecting systems from real-world threats.' },
];

const resourceTypes = [
  { name: 'YouTube', slug: 'youtube', icon: '▶️', color: 'red' },
  { name: 'Documentation', slug: 'docs', icon: '📄', color: 'blue' },
  { name: 'Practice Platform', slug: 'practice', icon: '💻', color: 'green' },
];

const getResources = (skillMap, typeMap) => [
  // ══════════════════════════════════════════
  // 🌐 WEB DEVELOPMENT
  // ══════════════════════════════════════════
  {
    title: 'HTML & CSS Full Course – Beginner to Pro',
    link: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
    description: 'Dave Gray\'s complete HTML & CSS course. Goes from absolute zero to building real projects with modern CSS techniques.',
    skillId: skillMap['web-development'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['html', 'css', 'web', 'beginner'], isFeatured: true,
  },
  {
    title: 'JavaScript Full Course for Beginners',
    link: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    description: 'freeCodeCamp\'s 134-hour JavaScript course. The most comprehensive free JS course on YouTube.',
    skillId: skillMap['web-development'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['javascript', 'js', 'programming', 'beginner'], isFeatured: true,
  },
  {
    title: 'React JS Full Course 2024',
    link: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA',
    description: 'Complete React course covering hooks, context, React Router, and building full projects from scratch.',
    skillId: skillMap['web-development'], typeId: typeMap['youtube'], level: 'intermediate',
    tags: ['react', 'javascript', 'frontend', 'hooks'],
  },
  {
    title: 'Next.js 14 Full Course',
    link: 'https://www.youtube.com/watch?v=ZjAqacIC_3c',
    description: 'Build full-stack apps with Next.js 14 App Router, Server Components, authentication, and Prisma.',
    skillId: skillMap['web-development'], typeId: typeMap['youtube'], level: 'advanced',
    tags: ['nextjs', 'react', 'fullstack', 'typescript'],
  },
  {
    title: 'MDN Web Docs – The Complete Reference',
    link: 'https://developer.mozilla.org/en-US/docs/Web',
    description: 'Mozilla\'s official documentation for HTML, CSS, and JavaScript. The gold standard reference for web developers.',
    skillId: skillMap['web-development'], typeId: typeMap['docs'], level: 'beginner',
    tags: ['html', 'css', 'javascript', 'reference'], isFeatured: true,
  },
  {
    title: 'JavaScript.info – The Modern JS Tutorial',
    link: 'https://javascript.info',
    description: 'From basics to advanced topics with simple but detailed explanations. The best structured JS learning path.',
    skillId: skillMap['web-development'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['javascript', 'tutorial', 'reference'],
  },
  {
    title: 'The Odin Project',
    link: 'https://www.theodinproject.com',
    description: 'Free full-stack curriculum with real projects. Covers HTML, CSS, JavaScript, Node, and Ruby on Rails.',
    skillId: skillMap['web-development'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['fullstack', 'curriculum', 'projects'], isFeatured: true,
  },
  {
    title: 'Full Stack Open – University of Helsinki',
    link: 'https://fullstackopen.com/en',
    description: 'University-grade web dev course covering React, Node, MongoDB, GraphQL, TypeScript. Completely free.',
    skillId: skillMap['web-development'], typeId: typeMap['practice'], level: 'intermediate',
    tags: ['react', 'node', 'mongodb', 'fullstack'],
  },
  {
    title: 'CSS Tricks – A Complete Guide to Flexbox',
    link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    description: 'The definitive visual guide to CSS Flexbox. Bookmark this — you\'ll come back to it constantly.',
    skillId: skillMap['web-development'], typeId: typeMap['docs'], level: 'beginner',
    tags: ['css', 'flexbox', 'layout', 'reference'],
  },
  {
    title: 'Kevin Powell – Conquering Responsive Layouts',
    link: 'https://courses.kevinpowell.co/conquering-responsive-layouts',
    description: 'Free 21-day email course by CSS king Kevin Powell. Teaches responsive CSS the right way.',
    skillId: skillMap['web-development'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['css', 'responsive', 'layout'],
  },
  // ══════════════════════════════════════════
  // 🤖 AI & MACHINE LEARNING
  // ══════════════════════════════════════════
  {
    title: 'Neural Networks: Zero to Hero – Andrej Karpathy',
    link: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
    description: 'The best neural network series ever made. Andrej Karpathy (ex-Tesla AI) builds GPT from scratch.',
    skillId: skillMap['ai-ml'], typeId: typeMap['youtube'], level: 'advanced',
    tags: ['neural networks', 'gpt', 'deep learning', 'python'], isFeatured: true,
  },
  {
    title: 'Machine Learning by Andrew Ng (Coursera)',
    link: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI',
    description: 'The legendary ML course by Andrew Ng. The foundation of machine learning education worldwide.',
    skillId: skillMap['ai-ml'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['machine learning', 'Andrew Ng', 'regression', 'classification'], isFeatured: true,
  },
  {
    title: 'StatQuest with Josh Starmer – ML Basics',
    link: 'https://www.youtube.com/@statquest',
    description: 'Complex statistics and ML concepts explained clearly with visuals. Perfect for visual learners.',
    skillId: skillMap['ai-ml'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['statistics', 'ml', 'visualization'],
  },
  {
    title: '3Blue1Brown – Neural Networks Playlist',
    link: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
    description: 'Beautiful visual explanations of backpropagation and neural networks. Builds intuition like nothing else.',
    skillId: skillMap['ai-ml'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['neural networks', 'backpropagation', 'visualization', '3b1b'], isFeatured: true,
  },
  {
    title: 'fast.ai – Practical Deep Learning for Coders',
    link: 'https://course.fast.ai',
    description: 'Top-down, practical approach to deep learning. Build real models before learning theory. World-class course.',
    skillId: skillMap['ai-ml'], typeId: typeMap['practice'], level: 'intermediate',
    tags: ['deep learning', 'pytorch', 'practical', 'fastai'],
  },
  {
    title: 'Hugging Face Documentation',
    link: 'https://huggingface.co/docs',
    description: 'The complete guide to Transformers, Diffusers, and the Hugging Face ecosystem. State-of-the-art NLP.',
    skillId: skillMap['ai-ml'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['transformers', 'nlp', 'llm', 'huggingface'],
  },
  {
    title: 'Kaggle – Machine Learning Courses',
    link: 'https://www.kaggle.com/learn',
    description: 'Free hands-on ML courses from Kaggle. Covers pandas, ML, deep learning, NLP, and computer vision.',
    skillId: skillMap['ai-ml'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['kaggle', 'ml', 'hands-on', 'competition'],
  },
  {
    title: 'Papers With Code – ML Research + Implementations',
    link: 'https://paperswithcode.com',
    description: 'Browse state-of-the-art ML papers with linked code implementations. Stay updated on AI research.',
    skillId: skillMap['ai-ml'], typeId: typeMap['docs'], level: 'advanced',
    tags: ['research', 'papers', 'sota', 'implementation'],
  },
  // ══════════════════════════════════════════
  // 📊 DATA SCIENCE
  // ══════════════════════════════════════════
  {
    title: 'Python for Data Analysis – freeCodeCamp',
    link: 'https://www.youtube.com/watch?v=GPVsHOlRBBI',
    description: 'Complete data analysis with Python, NumPy, Pandas, and Matplotlib. The best intro to data science.',
    skillId: skillMap['data-science'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['python', 'pandas', 'numpy', 'data analysis'], isFeatured: true,
  },
  {
    title: 'Kaggle Learn – Data Science Track',
    link: 'https://www.kaggle.com/learn/overview',
    description: 'Structured learning path: Python → Pandas → Data Viz → ML. Interactive notebooks in the browser.',
    skillId: skillMap['data-science'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['kaggle', 'pandas', 'python', 'visualization'],
  },
  {
    title: 'Pandas Official Documentation',
    link: 'https://pandas.pydata.org/docs/',
    description: 'The complete Pandas reference. Indispensable for data manipulation, cleaning, and analysis.',
    skillId: skillMap['data-science'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['pandas', 'dataframe', 'python', 'reference'],
  },
  {
    title: 'Data School – Pandas Video Series',
    link: 'https://www.youtube.com/@dataschool',
    description: 'Short, focused Pandas tutorial videos by Kevin Markham. Perfect for learning specific Pandas operations.',
    skillId: skillMap['data-science'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['pandas', 'data manipulation', 'tutorial'],
  },
  {
    title: 'Matplotlib & Seaborn Data Visualization',
    link: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
    description: 'Master data visualization in Python with Matplotlib and Seaborn. Create stunning charts and plots.',
    skillId: skillMap['data-science'], typeId: typeMap['youtube'], level: 'intermediate',
    tags: ['matplotlib', 'seaborn', 'visualization', 'charts'],
  },
  {
    title: 'SQL for Data Science – Mode Analytics Tutorial',
    link: 'https://mode.com/sql-tutorial/',
    description: 'SQL is the backbone of data science. This interactive tutorial by Mode covers everything from basics to advanced.',
    skillId: skillMap['data-science'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['sql', 'database', 'queries', 'analytics'],
  },
  // ══════════════════════════════════════════
  // 🐍 PYTHON
  // ══════════════════════════════════════════
  {
    title: 'Python Official Documentation',
    link: 'https://docs.python.org/3/',
    description: 'The authoritative Python 3 documentation. Essential reference for any level of Python programmer.',
    skillId: skillMap['python'], typeId: typeMap['docs'], level: 'beginner',
    tags: ['python', 'official', 'reference', 'docs'],
  },
  {
    title: 'Corey Schafer – Python Tutorials Playlist',
    link: 'https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU',
    description: 'The best Python tutorial series on YouTube. Clear, concise, covers basics to advanced OOP.',
    skillId: skillMap['python'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['python', 'oop', 'tutorial', 'basics'], isFeatured: true,
  },
  {
    title: 'Real Python – Tutorials & Articles',
    link: 'https://realpython.com',
    description: 'High-quality Python tutorials from intermediate to advanced. Best written resource for Python.',
    skillId: skillMap['python'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['python', 'tutorials', 'advanced', 'best practices'],
  },
  {
    title: 'Automate the Boring Stuff with Python',
    link: 'https://automatetheboringstuff.com',
    description: 'Free online book. Learn Python by automating real-world tasks — files, emails, PDFs, web scraping.',
    skillId: skillMap['python'], typeId: typeMap['docs'], level: 'beginner',
    tags: ['python', 'automation', 'scripting', 'beginners'],
  },
  {
    title: 'Python for Everybody – Dr. Chuck (freeCodeCamp)',
    link: 'https://www.youtube.com/watch?v=8DvywoWv6fI',
    description: 'The famous "py4e" course by Dr. Chuck. Great starting point for complete beginners in programming.',
    skillId: skillMap['python'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['python', 'beginners', 'Dr. Chuck', 'py4e'],
  },
  {
    title: 'Python Flask Full Course',
    link: 'https://www.youtube.com/watch?v=Qr4QMBUPxWo',
    description: 'Build web applications with Python Flask. Covers routing, templates, forms, and database integration.',
    skillId: skillMap['python'], typeId: typeMap['youtube'], level: 'intermediate',
    tags: ['flask', 'python', 'web', 'backend'],
  },
  // ══════════════════════════════════════════
  // 🧩 DSA & ALGORITHMS
  // ══════════════════════════════════════════
  {
    title: 'NeetCode – Blind 75 + 150 Solutions',
    link: 'https://neetcode.io',
    description: 'Curated list of 150 LeetCode problems with NeetCode\'s video solutions. The most efficient interview prep.',
    skillId: skillMap['dsa'], typeId: typeMap['practice'], level: 'intermediate',
    tags: ['leetcode', 'dsa', 'interview', 'blind75'], isFeatured: true,
  },
  {
    title: 'Abdul Bari – Algorithms Course',
    link: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
    description: 'Most comprehensive algorithms course on YouTube. Perfect visual explanations of sorting, trees, graphs, DP.',
    skillId: skillMap['dsa'], typeId: typeMap['youtube'], level: 'intermediate',
    tags: ['algorithms', 'sorting', 'trees', 'dp'], isFeatured: true,
  },
  {
    title: 'CS50x – Harvard Introduction to Computer Science',
    link: 'https://cs50.harvard.edu/x/',
    description: 'Harvard\'s legendary free CS course. The best way to build a strong CS foundation. Includes C, Python, SQL.',
    skillId: skillMap['dsa'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['cs50', 'harvard', 'c', 'foundations'],
  },
  {
    title: 'LeetCode – Practice Platform',
    link: 'https://leetcode.com',
    description: 'The industry-standard platform for technical interview preparation with 3000+ problems.',
    skillId: skillMap['dsa'], typeId: typeMap['practice'], level: 'intermediate',
    tags: ['leetcode', 'problems', 'interview', 'competitive'],
  },
  {
    title: 'GeeksforGeeks – DSA Self Paced',
    link: 'https://www.geeksforgeeks.org/data-structures/',
    description: 'Comprehensive articles on every data structure and algorithm with examples in multiple languages.',
    skillId: skillMap['dsa'], typeId: typeMap['docs'], level: 'beginner',
    tags: ['dsa', 'reference', 'articles', 'geeksforgeeks'],
  },
  {
    title: 'Striver\'s A2Z DSA Sheet',
    link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
    description: '456 handpicked DSA problems organized from beginner to advanced. The definitive roadmap for SDE roles.',
    skillId: skillMap['dsa'], typeId: typeMap['practice'], level: 'advanced',
    tags: ['striver', 'sde', 'roadmap', 'advanced'],
  },
  {
    title: 'William Fiset – Graph Algorithms Playlist',
    link: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P',
    description: 'The best YouTube series on graph algorithms. Covers BFS, DFS, Dijkstra, Floyd-Warshall, and more.',
    skillId: skillMap['dsa'], typeId: typeMap['youtube'], level: 'advanced',
    tags: ['graphs', 'algorithms', 'dfs', 'bfs', 'dijkstra'],
  },
  // ══════════════════════════════════════════
  // ☁️ DEVOPS & CLOUD
  // ══════════════════════════════════════════
  {
    title: 'TechWorld with Nana – DevOps Bootcamp',
    link: 'https://www.youtube.com/@TechWorldwithNana',
    description: 'Best DevOps YouTube channel. Full courses on Docker, Kubernetes, GitLab CI/CD, and Terraform.',
    skillId: skillMap['devops'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['devops', 'docker', 'kubernetes', 'ci/cd'], isFeatured: true,
  },
  {
    title: 'Docker Official Documentation',
    link: 'https://docs.docker.com',
    description: 'The complete Docker docs. Containerization from basics to advanced multi-container deployments.',
    skillId: skillMap['devops'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['docker', 'containers', 'devops', 'official'],
  },
  {
    title: 'Kubernetes Official Documentation',
    link: 'https://kubernetes.io/docs/home/',
    description: 'K8s official docs. Includes tutorials, concepts, and reference for container orchestration at scale.',
    skillId: skillMap['devops'], typeId: typeMap['docs'], level: 'advanced',
    tags: ['kubernetes', 'k8s', 'orchestration', 'containers'],
  },
  {
    title: 'KodeKloud – DevOps Practice Labs',
    link: 'https://kodekloud.com',
    description: 'Hands-on browser-based labs for Docker, Kubernetes, Ansible, Terraform, and more. Learn by doing.',
    skillId: skillMap['devops'], typeId: typeMap['practice'], level: 'intermediate',
    tags: ['labs', 'hands-on', 'docker', 'kubernetes'],
  },
  {
    title: 'GitHub Actions – Complete Guide',
    link: 'https://docs.github.com/en/actions',
    description: 'Official GitHub Actions documentation. Build CI/CD pipelines directly in your GitHub repository.',
    skillId: skillMap['devops'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['github actions', 'ci/cd', 'automation', 'workflows'],
  },
  {
    title: 'AWS Free Tier – Cloud Hands-On Practice',
    link: 'https://aws.amazon.com/free/',
    description: 'Get 12 months free on AWS services. Hands-on cloud experience with EC2, S3, Lambda, and more.',
    skillId: skillMap['devops'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['aws', 'cloud', 'free tier', 'practice'],
  },
  // ══════════════════════════════════════════
  // 🎨 UI/UX DESIGN
  // ══════════════════════════════════════════
  {
    title: 'Figma Tutorial for Beginners',
    link: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
    description: 'Complete beginner guide to Figma. Learn UI design, auto layout, components, and prototyping.',
    skillId: skillMap['ui-ux'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['figma', 'ui', 'design', 'prototyping'],
  },
  {
    title: 'Figma Learn – Official Resources',
    link: 'https://www.figma.com/resources/learn-design/',
    description: 'Official Figma learning resources. Tutorials, templates, and best practices from the Figma team.',
    skillId: skillMap['ui-ux'], typeId: typeMap['docs'], level: 'beginner',
    tags: ['figma', 'official', 'design', 'tutorial'],
  },
  {
    title: 'Refactoring UI – Design Tips for Developers',
    link: 'https://www.refactoringui.com',
    description: 'The best design resource for developers. Practical tips to make your UI look professional. By Tailwind creators.',
    skillId: skillMap['ui-ux'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['ui', 'design', 'developers', 'tips'], isFeatured: true,
  },
  {
    title: 'Kevin Powell – CSS for UI Design',
    link: 'https://www.youtube.com/@KevinPowell',
    description: 'CSS expert Kevin Powell teaches UI design with CSS. Modern layouts, animations, and design systems.',
    skillId: skillMap['ui-ux'], typeId: typeMap['youtube'], level: 'intermediate',
    tags: ['css', 'design', 'animations', 'layout'],
  },
  {
    title: 'Dribbble – Design Inspiration',
    link: 'https://dribbble.com',
    description: 'World\'s leading design inspiration platform. Browse thousands of UI/UX designs to spark creativity.',
    skillId: skillMap['ui-ux'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['inspiration', 'ui', 'design', 'portfolio'],
  },
  {
    title: 'UX Collective – Articles on User Experience',
    link: 'https://uxdesign.cc',
    description: 'High-quality UX design articles covering research methods, design patterns, and industry insights.',
    skillId: skillMap['ui-ux'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['ux', 'research', 'design patterns', 'articles'],
  },
  // ══════════════════════════════════════════
  // 🔐 CYBERSECURITY
  // ══════════════════════════════════════════
  {
    title: 'TryHackMe – Learn Cyber Security',
    link: 'https://tryhackme.com',
    description: 'Gamified cybersecurity learning platform. Guided learning paths for pentesting, web security, and more.',
    skillId: skillMap['cybersecurity'], typeId: typeMap['practice'], level: 'beginner',
    tags: ['tryhackme', 'pentesting', 'ctf', 'ethical hacking'], isFeatured: true,
  },
  {
    title: 'HackTheBox – Challenge-Based Hacking',
    link: 'https://www.hackthebox.com',
    description: 'Real-world hacking challenges. Attack vulnerable machines legally. Preferred platform for advanced learners.',
    skillId: skillMap['cybersecurity'], typeId: typeMap['practice'], level: 'advanced',
    tags: ['htb', 'ctf', 'advanced', 'pentesting'],
  },
  {
    title: 'NetworkChuck – Cybersecurity YouTube',
    link: 'https://www.youtube.com/@NetworkChuck',
    description: 'Engaging cybersecurity tutorials on ethical hacking, networking, Linux, and career guidance.',
    skillId: skillMap['cybersecurity'], typeId: typeMap['youtube'], level: 'beginner',
    tags: ['cybersecurity', 'ethical hacking', 'networking', 'linux'],
  },
  {
    title: 'OWASP – Web Security Testing Guide',
    link: 'https://owasp.org/www-project-web-security-testing-guide/',
    description: 'The definitive guide to web application security testing. Used by security professionals worldwide.',
    skillId: skillMap['cybersecurity'], typeId: typeMap['docs'], level: 'intermediate',
    tags: ['owasp', 'web security', 'testing', 'vulnerabilities'],
  },
  {
    title: 'John Hammond – CTF & Hacking YouTube',
    link: 'https://www.youtube.com/@_JohnHammond',
    description: 'CTF walkthroughs, malware analysis, and cybersecurity career tips from a CISA competition winner.',
    skillId: skillMap['cybersecurity'], typeId: typeMap['youtube'], level: 'intermediate',
    tags: ['ctf', 'malware', 'hacking', 'career'],
  },
  {
    title: 'PortSwigger Web Security Academy',
    link: 'https://portswigger.net/web-security',
    description: 'Free web security training by the creators of Burp Suite. Hands-on labs on XSS, SQLi, SSRF, and more.',
    skillId: skillMap['cybersecurity'], typeId: typeMap['practice'], level: 'intermediate',
    tags: ['burp suite', 'xss', 'sqli', 'web hacking'],
  },
];

const seed = async () => {
  await connectDB();

  console.log('🗑️  Clearing existing data...');
  await Promise.all([
    Skill.deleteMany(),
    ResourceType.deleteMany(),
    Resource.deleteMany(),
    Admin.deleteMany(),
  ]);

  console.log('🌱 Seeding skills...');
  const createdSkills = await Skill.insertMany(skills);
  const skillMap = {};
  createdSkills.forEach((s) => { skillMap[s.slug] = s._id; });

  console.log('🌱 Seeding resource types...');
  const createdTypes = await ResourceType.insertMany(resourceTypes);
  const typeMap = {};
  createdTypes.forEach((t) => { typeMap[t.slug] = t._id; });

  console.log('🌱 Seeding resources...');
  const resourceData = getResources(skillMap, typeMap);
  await Resource.insertMany(resourceData);

  // Update resource counts
  for (const skill of createdSkills) {
    const count = await Resource.countDocuments({ skillId: skill._id, isApproved: true });
    await Skill.findByIdAndUpdate(skill._id, { resourceCount: count });
  }

  console.log('🌱 Creating admin account...');
  await Admin.create({
    email: process.env.ADMIN_SEED_EMAIL || 'admin@eduhub.com',
    password: process.env.ADMIN_SEED_PASSWORD || 'Admin@123',
  });

  console.log(`\n✅ Seeding complete!`);
  console.log(`   📚 ${skills.length} skills`);
  console.log(`   🗂️  ${resourceTypes.length} resource types`);
  console.log(`   🔗 ${resourceData.length} resources`);
  console.log(`   👤 Admin: admin@eduhub.com / Admin@123`);

  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
