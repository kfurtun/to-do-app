'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthCheck from '@/app/hooks/useAuthCheck';

import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/joy/CircularProgress';

const errorMessages = {
  401: { message: 'Your email/password is incorrect. Please try again!' },
  500: { message: 'Unexpected error happenned. Please try again!' },
};

const Login = () => {
  useAuthCheck();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        marginTop="-2rem"
      >
        <Typography level="h3" gutterBottom>
          To Do App
        </Typography>
        <Box width="60%">
          <form onSubmit={onSubmit}>
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
                sx={{ width: '30%', mt: 4 }}
              >
                {isLoading ? <CircularProgress size="sm" /> : 'Sign in'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
