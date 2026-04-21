import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Skill from '@/models/Skill';

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1, name: 1 }).lean();
    return NextResponse.json({ success: true, count: skills.length, data: skills });
  } catch (err: any) {
    console.error("API Error (/api/skills):", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
