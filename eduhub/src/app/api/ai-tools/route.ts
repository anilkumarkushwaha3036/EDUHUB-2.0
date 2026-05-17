import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AITool from '@/models/AITool';

export async function GET() {
  try {
    await connectDB();
    const items = await AITool.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (err: any) {
    console.error("API Error (/api/ai-tools):", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
