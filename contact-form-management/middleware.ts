import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenCookie } from '@/src/lib/cookies';
import { ADMIN_ROUTES, READER_ROUTES, USER_ROLE } from '@/src/lib/constants';
import { verifyToken } from '@/src/lib/utils/api';

export async function middleware(request: NextRequest) {
  const token = await getTokenCookie(request);
  const user = await verifyToken(token);

  const url = request.nextUrl.clone();

  if (!token || !user) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const isAdmin = user.role === USER_ROLE.ADMIN;

  if ((isAdmin ? ADMIN_ROUTES : READER_ROUTES).every((route) => !request.nextUrl.pathname.startsWith(route))) {
    url.pathname = '/not-authorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/messages/:path*', '/users/:path*', '/reports/:path*'],
};
