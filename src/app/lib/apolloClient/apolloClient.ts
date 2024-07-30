//import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
'use client';
import { setContext } from '@apollo/client/link/context';
import { getTokenFromCookie } from '@/app/utils/auth';

import { HttpLink, from } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL,
});

export const client = () =>
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: true,
  });
