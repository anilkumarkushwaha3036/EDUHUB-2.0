import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Skill from '@/models/Skill';
import Resource from '@/models/Resource';
import { requireAdmin } from '@/lib/requireAdmin';

// POST /api/admin/skills — create skill
export async function POST(req: NextRequest) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const body = await req.json();
    const skill = await Skill.create(body);
    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch (err: any) {
    const msg = err.code === 11000
      ? `Duplicate slug: ${Object.keys(err.keyValue).join(', ')}`
      : err.message;
    return NextResponse.json({ success: false, message: msg }, { status: 400 });
  }
}

// GET /api/admin/skills — list all skills (same as public but no caching)
export async function GET(req: NextRequest) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  const skills = await Skill.find().sort({ order: 1, name: 1 }).lean();
  return NextResponse.json({ success: true, count: skills.length, data: skills });
}
