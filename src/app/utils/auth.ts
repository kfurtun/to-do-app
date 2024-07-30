import { type JWTPayload, jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { type NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { JWT_REFRESH_SECRET } from './constants';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (
  payload: JWTPayload,
  jwtExp: string,
  jwtSecret: string
): Promise<string> => {
  const secret = new TextEncoder().encode(jwtSecret);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(jwtExp)
    .sign(secret);

  return token;
};

export const verifyToken = async (
  token: string,
  jwtSecret: string
): Promise<JWTPayload | null> => {
  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
};

// export const verifyAccessToken = async (
//   token: string
// ): Promise<JWTPayload | null> => {
//   try {
//     const { payload } = await jwtVerify(token, JWT_ACCESS_SECRET);
//     return payload as JWTPayload;
//   } catch (error) {
//     return null;
//   }
// };

// export const verifyRefreshToken = async (
//   token: string
// ): Promise<JWTPayload | null> => {
//   try {
//     const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
//     // const db = await dbConnect();
//     // const refreshTokenCollection = db.db(dbName).collection('refreshTokens');
//     // const refreshToken = await refreshTokenCollection.findOne({
//     //   token,
//     //   userId: new ObjectId(payload.userId as string),
//     // });

//     // if (
//     //   !refreshToken ||
//     //   refreshToken.expires < new Date() ||
//     //   refreshToken.revoked
//     // ) {
//     //   return null;
//     // }

//     return payload as JWTPayload;
//   } catch (error) {
//     return null;
//   }
// };

interface SetTokenCookie {
  res: NextResponse;
  name: string;
  token: string;
  options: {
    httpOnly?: boolean;
    secure?: boolean;
    maxAge?: number;
    sameSite?: 'strict' | 'lax' | 'none' | undefined;
    path?: string;
  };
}
export const setTokenCookie = ({
  res,
  name,
  token,
  options: {
    httpOnly = true,
    secure = process.env.NODE_ENV !== 'development',
    maxAge = 7 * 24 * 60 * 60, // 7 days
    sameSite = 'strict',
    path = '/',
  },
}: SetTokenCookie) => {
  res.cookies.set(name, token, {
    httpOnly,
    secure,
    maxAge,
    sameSite,
    path,
  });
};

export const getSession = async () => {
  const cookie = cookies();
  const token = cookie.get('todoRT');
  if (!token) return null;

  return verifyToken(token.value, JWT_REFRESH_SECRET);
};

export const getTokenFromCookie = async (tokenName: string) => {
  const cookie = cookies();
  const token = cookie.get(tokenName);

  return token || null;
};

export const getTokenPayload = async (tokenName: string, secret: string) => {
  const token = await getTokenFromCookie(tokenName);
  if (!token) return null;

  return verifyToken(token.value, secret);
};
