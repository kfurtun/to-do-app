import { useRouter } from 'next/navigation';

const useSignOut = () => {
  const router = useRouter();
  const signOutClick = async () => {
    const res = await fetch('/api/auth/logout');

    if (res.ok) {
      router.push('/login');
    }
  };

  return { signOutClick };
};

export default useSignOut;
