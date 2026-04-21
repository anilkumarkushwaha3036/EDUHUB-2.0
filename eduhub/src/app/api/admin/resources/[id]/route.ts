import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Resource from '@/models/Resource';
import Skill from '@/models/Skill';
import { requireAdmin } from '@/lib/requireAdmin';

const syncResourceCount = async (skillId: any) => {
  const count = await Resource.countDocuments({ skillId, isApproved: true });
  await Skill.findByIdAndUpdate(skillId, { resourceCount: count });
};

// PUT /api/admin/resources/[id]
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
    const resource = await Resource.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate('skillId typeId');
    if (!resource) return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
    await syncResourceCount((resource.skillId as any)._id);
    return NextResponse.json({ success: true, data: resource });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}

// DELETE /api/admin/resources/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
    await syncResourceCount(resource.skillId);
    return NextResponse.json({ success: true, message: 'Resource deleted.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
