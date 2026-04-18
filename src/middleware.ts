import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()
  } catch (error) {
    // Don't block the request if session check fails —
    // protected pages will redirect unauthenticated users client-side
    console.error('Middleware session check failed:', error)
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/bookings/:path*',
    '/login',
    '/signup',
    '/auth/:path*',
  ],
}
