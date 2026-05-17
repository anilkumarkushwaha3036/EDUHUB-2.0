"use client";

import { useEffect, useState } from "react";
import SkillCard from "@/components/ui/SkillCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { fetchSkills } from "@/lib/api";
import { Skill } from "@/types";

export default function SkillsPageClient() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">


        {loading ? (
          <LoadingSkeleton count={8} type="skill" />
        ) : (
          <div className="grid-skills">
            {skills.map((skill, i) => (
              <SkillCard key={skill._id} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
