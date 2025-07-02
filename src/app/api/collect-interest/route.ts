export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '../../../generated/prisma';
import crypto from 'crypto';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const prisma = new PrismaClient();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    let email = '';
    let name = '';
    try {
      const parsed = JSON.parse(body);
      email = parsed.email;
      name = parsed.name;
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
    }
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.waitlistUser.findUnique({ where: { email } });
    if (existing && existing.verified) {
      return NextResponse.json({ error: 'This email is already verified and on the waitlist.' }, { status: 400 });
    }

    // Generate a unique token
    const token = generateToken();

    // Upsert user (create or update)
    await prisma.waitlistUser.upsert({
      where: { email },
      update: { name, token, verified: false },
      create: { name, email, token, verified: false },
    });

    // Verification link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verifyUrl = `${baseUrl}/verify/${token}`;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Modern, branded HTML email
    const html = `
      <div style="background: #0a0f1c; color: #fff; font-family: 'Segoe UI', Arial, sans-serif; padding: 32px; border-radius: 16px; max-width: 480px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src='https://scent-emitter.vercel.app/hero-model.png' alt='Scent Emitter' style='width: 64px; height: 64px; border-radius: 16px; margin-bottom: 16px;' />
          <h1 style="font-size: 2rem; font-weight: bold; background: linear-gradient(90deg, #60a5fa, #a78bfa); -webkit-background-clip: text; color: transparent;">Scent Emitter</h1>
        </div>
        <h2 style="font-size: 1.25rem; margin-bottom: 16px;">Hi ${name},</h2>
        <p style="margin-bottom: 24px;">Thank you for joining the <b>Scent Emitter</b> waitlist! Please verify your email address to confirm your spot.</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #3b82f6, #a78bfa); color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; font-size: 1rem; margin-bottom: 16px;">Verify your email</a>
        <p style="margin-top: 24px; font-size: 0.95rem; color: #a3a3a3;">If you did not request this, you can safely ignore this email.</p>
        <p style="margin-top: 8px; font-size: 0.95rem; color: #a3a3a3;">Or copy and paste this link into your browser:<br><span style="word-break: break-all;">${verifyUrl}</span></p>
      </div>
    `;

    await transporter.sendMail({
      from: `Scent Emitter <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email for Scent Emitter Waitlist',
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
} 