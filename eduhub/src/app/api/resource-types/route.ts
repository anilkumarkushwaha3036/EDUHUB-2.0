import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ResourceType from '@/models/ResourceType';

export async function GET() {
  try {
    await connectDB();
    const types = await ResourceType.find().sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, count: types.length, data: types });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
