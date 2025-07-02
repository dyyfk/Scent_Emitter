import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params;
  if (!token) {
    return NextResponse.json({ success: false, error: 'No token provided.' }, { status: 400 });
  }
  try {
    const user = await prisma.waitlistUser.findUnique({ where: { token } });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid or expired token.' }, { status: 400 });
    }
    if (user.verified) {
      return NextResponse.json({ success: true, message: 'Already verified.' });
    }
    await prisma.waitlistUser.update({ where: { token }, data: { verified: true } });
    return NextResponse.json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Something went wrong.' }, { status: 500 });
  }
} 