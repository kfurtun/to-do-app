import { NextRequest, NextResponse } from 'next/server';
import { serializeCookie } from './helpers';
import { verifyToken, generateToken } from '@/app/utils/auth';
import {
  JWT_ACCESS_DURATION,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from '@/app/utils/constants';

export async function GET(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  const publicPaths = ['/login', '/signup'];

  const refreshToken = req.cookies.get('todoRT');
  const accessToken = req.cookies.get('todoAT');

  if (!refreshToken && !publicPaths.includes(pathname)) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  if (refreshToken) {
    const refreshTokenPayload = await verifyToken(
      refreshToken.value,
      JWT_REFRESH_SECRET
    );

    if (!refreshTokenPayload && !publicPaths.includes(pathname)) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
    // if (refreshTokenPayload && !publicPaths.includes(pathname)) {
    //   return NextResponse.next();
    // }

    const _response = (redirect: boolean) =>
      NextResponse.json({ redirect }, { status: 200 });
    //const res200 = NextResponse.json({ valid: true }, { status: 200 });

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

        if (!publicPaths.includes(pathname)) {
          const response = _response(false);
          response.headers.append(
            'Set-Cookie',
            serializeCookie(newAccessToken, 'todoAT')
          );
          return response;
        } else {
          const response = _response(true);
          response.headers.append(
            'Set-Cookie',
            serializeCookie(newAccessToken, 'todoAT')
          );
          return response;
        }
      }
      //   else {
      //     if (publicPaths.includes(pathname) && pathname !== '/') {
      //       return res401;
      //     }
      //   }
    }
  }

  return NextResponse.json({ valid: true }, { status: 200 });
}
