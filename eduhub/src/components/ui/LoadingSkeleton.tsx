"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LoadingSkeleton({
  count = 6,
  type = "resource",
}: {
  count?: number;
  type?: "resource" | "skill";
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use appropriate colors depending on the theme
  const baseColor = mounted && theme === "dark" ? "#0d1526" : "#f1f5f9";
  const highlightColor = mounted && theme === "dark" ? "#111c30" : "#e2e8f0";

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className={type === "skill" ? "grid-skills" : "grid-resources"}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ height: type === "skill" ? "160px" : "220px" }}>
            <Skeleton height="100%" borderRadius="0.5rem" />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
}
