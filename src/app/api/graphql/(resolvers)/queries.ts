import { QueryResolvers } from '../(generatedTypes)/resolversTypes';

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  // Our third argument (`contextValue`) has a type here, so we
  // can check the properties within our resolver's shared context value.
  getTasks: async (_, __, { dataSources }) => {
    return dataSources.taskQueries.getTasks();
  },
};

export default queries;
