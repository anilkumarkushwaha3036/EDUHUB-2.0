import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Skill from '@/models/Skill';
import Resource from '@/models/Resource';
import { requireAdmin } from '@/lib/requireAdmin';

// PUT /api/admin/skills/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const body = await req.json();
    const skill = await Skill.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!skill) return NextResponse.json({ success: false, message: 'Skill not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: skill });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}

// DELETE /api/admin/skills/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return NextResponse.json({ success: false, message: 'Skill not found' }, { status: 404 });
    await Resource.deleteMany({ skillId: id });
    return NextResponse.json({ success: true, message: 'Skill and its resources deleted.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
