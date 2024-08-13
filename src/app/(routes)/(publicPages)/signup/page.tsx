'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Link as MUILink,
  Input,
  Typography,
  CircularProgress,
} from '@mui/joy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors: string[] = [];

    if (password !== confirmPassword) {
      validationErrors.push('Passwords do not match');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    const data = await response.json();
    setIsLoading(false);
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);

    if (response?.ok) {
      router.push('/');
      //router.refresh();
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
        }}
      >
        <Typography level="h4" sx={{ mb: 2 }}>
          Sign Up
        </Typography>

        {errors.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {errors.map((error, index) => (
              <Typography key={index} color="danger">
                {error}
              </Typography>
            ))}
          </Box>
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="solid"
          color="primary"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size="sm" /> : 'Sign up'}
        </Button>
        <Typography level="body-sm" sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login" passHref legacyBehavior>
            <MUILink>Log in</MUILink>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
