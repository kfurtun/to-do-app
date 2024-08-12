'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthCheck from '@/app/hooks/useAuthCheck';
import useSignOut from '@/app/hooks/useSignOut';
import {
  Box,
  Button,
  Link as MUILink,
  Input,
  Typography,
  CircularProgress,
} from '@mui/joy';
import Link from 'next/link';

const errorMessages = {
  401: { message: 'Your email/password is incorrect. Please try again!' },
  500: { message: 'Unexpected error happenned. Please try again!' },
};

const LoginPage = () => {
  useAuthCheck();

  // useEffect(() => {
  //   const signOut = async () => await fetch('/api/auth/logout');

  //   signOut();
  // }, []);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    // todo -> save user session to redux

    if (response?.ok) {
      router.push('/');
      //router.refresh();
    } else {
      setIsLoading(false);
      if (response?.status === 401) {
        setErrorMessage(errorMessages[401].message);
      } else {
        setErrorMessage(errorMessages[500].message);
      }
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.level1',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 3,
          borderRadius: 2,
          boxShadow: 'lg',
          bgcolor: 'background.surface',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography level="h3" gutterBottom>
          To Do App
        </Typography>
        <Box width="80%">
          <Input
            placeholder="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Input
            placeholder="Password"
            variant="outlined"
            fullWidth
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography level="inherit" color="danger" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="solid"
              color="primary"
              sx={{ width: '50%', mt: 4 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size="sm" /> : 'Login'}
            </Button>
          </Box>
          <Typography level="body-sm" sx={{ mt: 2, textAlign: 'center' }}>
            Don’t have an account?{' '}
            <Link href="/signup" passHref legacyBehavior>
              <MUILink>Sign Up</MUILink>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
