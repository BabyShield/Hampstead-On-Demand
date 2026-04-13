import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit, getClientIdentifier, createRateLimitHeaders, RATE_LIMIT_PRESETS } from '@/lib/rate-limit';

export const maxDuration = 10;

// Zod schema for input validation
const bookingEmailSchema = z.object({
  serviceName: z.string().min(1, 'Service name is required').max(200),
  date: z.string().min(1, 'Date is required'),
  slot: z.enum(['Morning', 'Afternoon'], { 
    errorMap: () => ({ message: 'Slot must be Morning or Afternoon' }) 
  }),
  notes: z.string().max(1000).optional(),
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    // Rate limit check
    const clientId = getClientIdentifier(request);
    const rateLimitResult = checkRateLimit(`bookings:${clientId}`, RATE_LIMIT_PRESETS.standard);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests', message: 'Please wait before submitting another booking.' },
        { 
          status: 429, 
          headers: {
            ...createRateLimitHeaders(rateLimitResult),
            'Retry-After': Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
          }
        }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not set. Skipping email sending.');
      return NextResponse.json({ success: true, message: 'Booking received (Email skipped: API key missing)' });
    }

    if (!adminEmail) {
      console.warn('ADMIN_EMAIL is not set. Skipping admin notification.');
      return NextResponse.json({ success: true, message: 'Booking received (Admin email skipped: not configured)' });
    }

    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = bookingEmailSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { serviceName, date, slot, notes, email } = validationResult.data;
    const resend = new Resend(resendApiKey);
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    // Send email to Admin
    await resend.emails.send({
      from: `Hampstead On-Demand <${senderEmail}>`,
      to: adminEmail,
      subject: `New Booking Request: ${serviceName}`,
      html: `
        <h1>New Booking Request</h1>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
        <p><strong>Slot:</strong> ${slot}</p>
        <p><strong>Customer Email:</strong> ${email}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
        <br/>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">View in Dashboard</a>
      `
    });

    // Send confirmation to User
    await resend.emails.send({
      from: `Hampstead On-Demand <${senderEmail}>`,
      to: email,
      subject: `Booking Received: ${serviceName}`,
      html: `
        <h1>We received your request!</h1>
        <p>Thanks for booking <strong>${serviceName}</strong>.</p>
        <p>We are checking availability for <strong>${new Date(date).toLocaleDateString()} (${slot})</strong>.</p>
        <p>You will receive a confirmation email shortly.</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
