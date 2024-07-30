import { MutationResolvers } from '../(generatedTypes)/resolversTypes';

// Use the generated `QueryResolvers` type to type check our queries!
const mutations: MutationResolvers = {
  // Our third argument (`contextValue`) has a type here, so we
  // can check the properties within our resolver's shared context value.
  saveTask: async (_, { newTask }, { dataSources }) => {
    return dataSources.taskMutations.saveTask(newTask);
  },
  updateTask: async (_, { updatedTask }, { dataSources }) => {
    return dataSources.taskMutations.updateTask(updatedTask);
  },
  deleteTask: async (_, { id }, { dataSources }) => {
    return dataSources.taskMutations.deleteTask(id);
  },
};

export default mutations;
