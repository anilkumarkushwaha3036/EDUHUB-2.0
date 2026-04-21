import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authorized. No token.' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const admin = await Admin.findById(decoded.id).select('-password').lean();
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin not found.' }, { status: 401 });
    }

    return NextResponse.json({ success: true, data: admin });
  } catch {
    return NextResponse.json({ success: false, message: 'Token invalid or expired.' }, { status: 401 });
  }
}
