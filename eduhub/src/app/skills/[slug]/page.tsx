import Navbar from "@/components/layout/Navbar";

import SkillDetailClient from "./SkillDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5rem" }}>
        <SkillDetailClient slug={slug} />
      </main>

    </>
  );
}
