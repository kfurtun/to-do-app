export const dbName = process.env.DB_NAME!;

export const JWT_ACCESS_DURATION =
  (process.env.JWT_ACCESS_DURATION as string) || '10m';
export const JWT_REFRESH_DURATION =
  (process.env.JWT_REFRESH_DURATION as string) || '7d';
export const JWT_ACCESS_DURATION_MS =
  (process.env.JWT_ACCESS_DURATION_MS as string) || '600';
export const JWT_REFRESH_DURATION_MS =
  (process.env.JWT_REFRESH_DURATION_MS as string) || '604800';
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const publicPaths = ['/login', '/signup'];
