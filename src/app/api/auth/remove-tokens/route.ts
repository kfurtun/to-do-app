import { NextRequest, NextResponse } from 'next/server';
import { setTokenCookie } from '@/app/utils/auth';

export async function GET(req: NextRequest) {
  const res = NextResponse.json({ message: 'Tokens are cleared.' });

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
