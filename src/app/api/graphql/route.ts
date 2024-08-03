import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';

import { readFileSync } from 'fs';
import resolvers from './(resolvers)';
import { GraphQLError } from 'graphql';
import { TaskQueries, TaskMutations } from './datasources';
import {
  getTokenFromCookie,
  verifyToken,
  generateToken,
} from '@/app/utils/auth';
import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_DURATION,
  JWT_ACCESS_DURATION_MS,
} from '@/app/utils/constants';
import { cookies } from 'next/headers';

export interface MyContext {
  dataSources: {
    taskQueries: TaskQueries;
    taskMutations: TaskMutations;
  };
}

const typeDefs = readFileSync(
  process.cwd() + '/src/app/api/graphql/schema.graphql',
  {
    encoding: 'utf-8',
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const accessTokenObj = await getTokenFromCookie('todoAT');
    const refreshTokenObj = await getTokenFromCookie('todoRT');

    if (
      refreshTokenObj &&
      (await verifyToken(refreshTokenObj.value, JWT_REFRESH_SECRET))
    ) {
      const refreshTokenPayload = await verifyToken(
        refreshTokenObj.value,
        JWT_REFRESH_SECRET
      );

      if (refreshTokenPayload) {
        if (
          !accessTokenObj ||
          !(await verifyToken(accessTokenObj.value, JWT_ACCESS_SECRET))
        ) {
          const newAccessToken = await generateToken(
            refreshTokenPayload,
            JWT_ACCESS_DURATION,
            JWT_ACCESS_SECRET
          );

          const cookie = cookies();
          cookie.set({
            name: 'todoAT',
            value: newAccessToken,
            httpOnly: true,
            maxAge: parseFloat(JWT_ACCESS_DURATION_MS),
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });
        }
      }
      return {
        req,
        res,
        refreshTokenPayload,
        dataSources: {
          taskQueries: new TaskQueries(),
          taskMutations: new TaskMutations(),
        },
      };
    }

    if (
      (!accessTokenObj?.value ||
        !(await verifyToken(accessTokenObj.value, JWT_ACCESS_SECRET))) &&
      (!refreshTokenObj ||
        !(await verifyToken(refreshTokenObj.value, JWT_REFRESH_SECRET)))
    ) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }

    throw new GraphQLError('Server error occured', {
      extensions: {
        code: 'SERVER_ERROR',
        http: { status: 500 },
      },
    });
    // return {
    //   req,
    //   res,
    //   dataSources: {
    //     taskQueries: new TaskQueries(),
    //     taskMutations: new TaskMutations(),
    //   },
    // };
  },
});

export { handler as GET, handler as POST };
