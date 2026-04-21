// Shared auth guard helper for admin API routes
import { NextRequest } from 'next/server';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import Admin from '@/models/Admin';
import connectDB from '@/lib/db';
import { IAdmin } from '@/models/Admin';

export async function requireAdmin(req: NextRequest): Promise<{ admin: IAdmin } | { error: string; status: number }> {
  await connectDB();
  const token = getTokenFromRequest(req);
  if (!token) return { error: 'Not authorized. No token.', status: 401 };

  try {
    const decoded = verifyToken(token);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return { error: 'Admin not found.', status: 401 };
    return { admin };
  } catch {
    return { error: 'Token invalid or expired.', status: 401 };
  }
}
