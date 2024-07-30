import { NextResponse, type NextRequest } from 'next/server';
import { serialize } from 'cookie';
import { verifyToken, generateToken } from './app/utils/auth';
import {
  JWT_ACCESS_DURATION,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from '@/app/utils/constants';

export async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  const publicPaths = ['/login', '/signup'];

  const refreshToken = req.cookies.get('todoRT');
  const accessToken = req.cookies.get('todoAT');

  if (!refreshToken && !publicPaths.includes(pathname)) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (refreshToken) {
    const refreshTokenPayload = await verifyToken(
      refreshToken.value,
      JWT_REFRESH_SECRET
    );

    if (!refreshTokenPayload && !publicPaths.includes(pathname)) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    const homeUrl = new URL('/', req.url);
    const redirectRes = NextResponse.redirect(homeUrl);
    const nextRes = NextResponse.next();

    if (refreshTokenPayload) {
      if (
        !accessToken ||
        !(await verifyToken(accessToken.value, JWT_ACCESS_SECRET))
      ) {
        const newAccessToken = await generateToken(
          refreshTokenPayload,
          JWT_ACCESS_DURATION,
          JWT_ACCESS_SECRET
        );

        if (!publicPaths.includes(pathname) || pathname === '/') {
          nextRes.headers.append(
            'Set-Cookie',
            serialize('todoAT', newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            })
          );
          return nextRes;
        } else {
          redirectRes.headers.append(
            'Set-Cookie',
            serialize('todoAT', newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            })
          );
          return redirectRes;
        }
      } else {
        if (publicPaths.includes(pathname) && pathname !== '/') {
          return redirectRes;
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
