export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    let email = '';
    try {
      email = JSON.parse(body).email;
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the verification email
    await transporter.sendMail({
      from: `Scent Emitter <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to the Scent Emitter Waitlist',
      text: `Thank you for joining the Scent Emitter waitlist! We'll keep you updated.`,
      html: `<p>Thank you for joining the <b>Scent Emitter</b> waitlist!<br>We'll keep you updated on our progress and next steps.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
} 