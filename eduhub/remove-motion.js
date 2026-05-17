const fs = require('fs');
const files = [
  'src/components/home/HeroSection.tsx',
  'src/components/home/FeaturedSkillsSection.tsx',
  'src/components/home/FeaturedResourcesSection.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Remove import
  content = content.replace(/import \{ motion \} from "framer-motion";\n?/g, '');
  content = content.replace(/import \{ motion \} from 'framer-motion';\n?/g, '');
  // Remove <motion. tags
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');
  // Remove animation props
  content = content.replace(/\s*(initial|animate|transition|exit)=\{\{[\s\S]*?\}\}/g, '');
  fs.writeFileSync(file, content);
});
console.log("Animations removed successfully.");
