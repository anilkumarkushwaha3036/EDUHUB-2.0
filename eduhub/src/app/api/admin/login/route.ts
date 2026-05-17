import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password.' },
        { status: 400 }
      );
    }

    // Automatically sync or seed the admin credentials from .env.local dynamically
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (envEmail && envPassword) {
      const formattedEmail = envEmail.toLowerCase().trim();
      const existingAdmin = await Admin.findOne({ email: formattedEmail });
      if (!existingAdmin) {
        // Create initial admin with configured env values
        await Admin.create({
          email: formattedEmail,
          password: envPassword,
        });
      } else {
        // Automatically update password in DB if it has been updated in .env.local
        const isMatch = await existingAdmin.comparePassword(envPassword);
        if (!isMatch) {
          existingAdmin.password = envPassword;
          await existingAdmin.save();
        }
      }
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin || !(await admin.comparePassword(password))) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const token = signToken(admin._id.toString());
    return NextResponse.json({
      success: true,
      token,
      data: { id: admin._id, email: admin.email },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
