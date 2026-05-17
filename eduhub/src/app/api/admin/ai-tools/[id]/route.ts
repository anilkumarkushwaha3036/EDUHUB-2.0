import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AITool from '@/models/AITool';
import { requireAdmin } from '@/lib/requireAdmin';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const body = await req.json();
    const tool = await AITool.findByIdAndUpdate(id, body, { new: true });
    if (!tool) return NextResponse.json({ success: false, message: 'Tool not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: tool });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const tool = await AITool.findByIdAndDelete(id);
    if (!tool) return NextResponse.json({ success: false, message: 'Tool not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Tool deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
