import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Resource from '@/models/Resource';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim() || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    if (!q) {
      return NextResponse.json({ success: true, count: 0, total: 0, data: [] });
    }

    const filter = {
      isApproved: true,
      $text: { $search: q },
    };

    const skip = (page - 1) * limit;
    const total = await Resource.countDocuments(filter);
    const resources = await Resource.find(filter, { score: { $meta: 'textScore' } })
      .populate('skillId', 'name slug icon color')
      .populate('typeId', 'name slug icon')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, count: resources.length, total, data: resources });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
