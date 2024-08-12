import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/app/utils/auth';
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
  try {
    const { email, password, firstName, lastName } = await req.json();

    const hashedPassword = await hashPassword(password);

    const db = await dbConnect();
    const userCollection = db.db(dbName).collection('users');
    await userCollection.insertOne({
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashedPassword,
    });

    const user = await userCollection.findOne({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 400 });
    }

    const userPayload = { email: user.email, name: user.firstName };

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

    const res = NextResponse.json({ message: 'Signup successful' });

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
  } catch (err) {
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
