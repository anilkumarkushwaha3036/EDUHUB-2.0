import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Resource from '@/models/Resource';
import Skill from '@/models/Skill';
import ResourceType from '@/models/ResourceType';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const skill = searchParams.get('skill');
    const type = searchParams.get('type');
    const level = searchParams.get('level');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const filter: Record<string, any> = { isApproved: true };

    if (skill) {
      const skillDoc = await Skill.findOne({ slug: skill }).lean();
      if (skillDoc) filter.skillId = skillDoc._id;
    }
    if (type) {
      const typeDoc = await ResourceType.findOne({ slug: type }).lean();
      if (typeDoc) filter.typeId = typeDoc._id;
    }
    if (level) filter.level = level;
    if (featured === 'true') filter.isFeatured = true;

    const skip = (page - 1) * limit;
    const total = await Resource.countDocuments(filter);
    const resources = await Resource.find(filter)
      .populate('skillId', 'name slug icon color')
      .populate('typeId', 'name slug icon')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      count: resources.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: resources,
    });
  } catch (err: any) {
    console.error("API Error (/api/resources):", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
