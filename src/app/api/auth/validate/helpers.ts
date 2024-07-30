import { serialize } from 'cookie';

export const serializeCookie = (token: string, cookieName: string) =>
  serialize(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
