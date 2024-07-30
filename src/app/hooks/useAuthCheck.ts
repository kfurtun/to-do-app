import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function useAuthCheck(): void {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/validate');
        const { redirect } = await response.json();

        if (response.status === 401) {
          // Redirect to login if the token is invalid
          router.push('/login');
        } else if (redirect) {
          // Redirect to login page if refresh token is valid and redirect is true
          router.push('/');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/login');
      }
    };

    // Check authentication whenever the pathname changes
    checkAuth();
  }, [router, pathname]);
}
