import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('refreshToken')?.value;

  console.log('Token from cookie:', token);

  if (!token || token === 'undefined') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Only run on protected routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    // Add other protected routes here
  ],
};
