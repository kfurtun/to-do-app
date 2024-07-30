import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/utils/auth';
import { JWT_REFRESH_SECRET } from '@/app/utils/constants';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('todoRT');

  if (!cookie) {
    return NextResponse.json({ session: null });
  }

  try {
    // Verify the JWT token using `jose`
    const payload = await verifyToken(cookie.value, JWT_REFRESH_SECRET);

    // Return session data if valid
    return NextResponse.json({ session: payload });
  } catch (error) {
    // Return null if token is invalid or expired
    return NextResponse.json({ session: null });
  }
}
