import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userData = request.cookies.get('user')?.value;
  
  if (!userData) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    const user = JSON.parse(userData);
    if (!user.is_admin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};