'use client';

import React, { ReactNode } from 'react';
import { client } from '@/app/lib/apolloClient';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { AuthProvider } from '../Context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <ApolloNextAppProvider makeClient={client}>
        {children}
      </ApolloNextAppProvider>
    </AuthProvider>
  );
};

export default Providers;
