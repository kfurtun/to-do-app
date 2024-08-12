import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';

const useSignOut = () => {
  const router = useRouter();
  const client = useApolloClient();

  const signOutClick = async () => {
    await client.clearStore();
    const res = await fetch('/api/auth/logout');

    if (res.ok) {
      router.push('/login');
    }
  };

  return { signOutClick };
};

export default useSignOut;
