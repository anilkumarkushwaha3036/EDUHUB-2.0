import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { requireAdmin } from '@/lib/requireAdmin';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const auth = await requireAdmin(req);
  if ('error' in auth) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

  try {
    const { id } = await params;
    const body = await req.json();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!blog) return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: blog });
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
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Blog deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
