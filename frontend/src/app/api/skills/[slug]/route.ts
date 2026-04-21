import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Skill from '@/models/Skill';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const skill = await Skill.findOne({ slug }).lean();
    if (!skill) {
      return NextResponse.json({ success: false, message: 'Skill not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: skill });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
