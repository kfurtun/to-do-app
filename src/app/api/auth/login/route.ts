import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/app/utils/auth';
import dbConnect from '@/app/utils/dbConnect';
import {
  dbName,
  JWT_ACCESS_DURATION,
  JWT_REFRESH_DURATION,
  JWT_ACCESS_DURATION_MS,
  JWT_REFRESH_DURATION_MS,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from '@/app/utils/constants';
import { setTokenCookie, generateToken } from '@/app/utils/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const db = await dbConnect();
  const userCollection = db.db(dbName).collection('users');
  const user = await userCollection.findOne({ email });
  //console.log(user, 'zaa');
  if (!user) {
    return NextResponse.json(
      { message: 'Invalid username or password' },
      { status: 401 }
    );
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json(
      { message: 'Invalid username or password' },
      { status: 401 }
    );
  }

  const userPayload = { email: user.email, name: user.name };

  const accessToken = await generateToken(
    userPayload,
    JWT_ACCESS_DURATION,
    JWT_ACCESS_SECRET
  );
  const refreshToken = await generateToken(
    userPayload,
    JWT_REFRESH_DURATION,
    JWT_REFRESH_SECRET
  );

  const res = NextResponse.json({ message: 'Login successful' });

  setTokenCookie({
    res,
    name: 'todoAT',
    token: accessToken,
    options: {
      maxAge: parseInt(JWT_ACCESS_DURATION_MS) || 600,
    },
  });

  setTokenCookie({
    res,
    name: 'todoRT',
    token: refreshToken,
    options: {
      maxAge: parseInt(JWT_REFRESH_DURATION_MS) || 604800,
    },
  });

  return res;
}
