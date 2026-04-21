import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Resource from '@/models/Resource';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const resource = await Resource.findById(id)
      .populate('skillId', 'name slug icon color')
      .populate('typeId', 'name slug icon');

    if (!resource) {
      return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
    }

    resource.views += 1;
    await resource.save();

    return NextResponse.json({ success: true, data: resource });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
