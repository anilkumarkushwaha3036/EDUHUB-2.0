export default function LoadingSkeleton({
  count = 6,
  type = "resource",
}: {
  count?: number;
  type?: "resource" | "skill";
}) {
  return (
    <div className={type === "skill" ? "grid-skills" : "grid-resources"}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ height: type === "skill" ? "160px" : "220px" }}
        />
      ))}
    </div>
  );
}
