import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AITool from '@/models/AITool';
import { requireAdmin } from '@/lib/requireAdmin';

export async function POST(req: NextRequest) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const body = await req.json();
    const tool = await AITool.create(body);
    return NextResponse.json({ success: true, data: tool }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
