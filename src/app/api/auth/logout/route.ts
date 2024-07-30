import { NextRequest, NextResponse } from 'next/server';
import { setTokenCookie } from '@/app/utils/auth';

export async function GET(req: NextRequest) {
  const homeUrl = new URL('/', req.url);
  const res = NextResponse.redirect(homeUrl);

  setTokenCookie({
    res,
    name: 'todoAT',
    token: '',
    options: {
      maxAge: -1,
    },
  });

  setTokenCookie({
    res,
    name: 'todoRT',
    token: '',
    options: {
      maxAge: -1,
    },
  });

  return res;
}
