import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Resource from '@/models/Resource';
import Skill from '@/models/Skill';
import { requireAdmin } from '@/lib/requireAdmin';

const syncResourceCount = async (skillId: any) => {
  const count = await Resource.countDocuments({ skillId, isApproved: true });
  await Skill.findByIdAndUpdate(skillId, { resourceCount: count });
};

// GET /api/admin/resources — all resources (including unapproved)
export async function GET(req: NextRequest) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;

  const total = await Resource.countDocuments();
  const resources = await Resource.find()
    .populate('skillId', 'name slug icon')
    .populate('typeId', 'name slug icon')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return NextResponse.json({ success: true, count: resources.length, total, data: resources });
}

// POST /api/admin/resources — create resource
export async function POST(req: NextRequest) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const body = await req.json();
    const resource = await Resource.create(body);
    await syncResourceCount(resource.skillId);
    const populated = await resource.populate('skillId typeId');
    return NextResponse.json({ success: true, data: populated }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
