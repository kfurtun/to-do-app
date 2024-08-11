import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '@/app/api/graphql/route';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CompletedTasks = {
  __typename?: 'CompletedTasks';
  dates?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  totalCount: Scalars['Int']['output'];
};

export type Dates = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  todayDate: Scalars['String']['input'];
};

export type InputTask = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Boolean']['input']>;
  reminders?: InputMaybe<Scalars['Boolean']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
};

export type LoadMoreVars = {
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteTask?: Maybe<StatusResponse>;
  saveTask?: Maybe<StatusResponse>;
  updateTask?: Maybe<StatusResponse>;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationSaveTaskArgs = {
  newTask: InputTask;
};


export type MutationUpdateTaskArgs = {
  updatedTask: UpdatedTaskInput;
};

export type Query = {
  __typename?: 'Query';
  getCompletedTasks?: Maybe<CompletedTasks>;
  getTasks?: Maybe<Array<Maybe<Task>>>;
  getTasksByDate?: Maybe<Array<Maybe<Task>>>;
};


export type QueryGetCompletedTasksArgs = {
  loadMoreVars: LoadMoreVars;
};


export type QueryGetTasksByDateArgs = {
  dates: Dates;
};

export type StatusResponse = {
  __typename?: 'StatusResponse';
  status: Scalars['String']['output'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String']['output'];
  completedOn?: Maybe<Scalars['String']['output']>;
  date: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  isCompleted: Scalars['Boolean']['output'];
  priority: Scalars['Boolean']['output'];
  reminders: Scalars['Boolean']['output'];
  task: Scalars['String']['output'];
};

export type UpdatedTaskInput = {
  _id: Scalars['String']['input'];
  completedOn?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Boolean']['input']>;
  reminders?: InputMaybe<Scalars['Boolean']['input']>;
  task?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CompletedTasks: ResolverTypeWrapper<CompletedTasks>;
  Dates: Dates;
  InputTask: InputTask;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoadMoreVars: LoadMoreVars;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  StatusResponse: ResolverTypeWrapper<StatusResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  UpdatedTaskInput: UpdatedTaskInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CompletedTasks: CompletedTasks;
  Dates: Dates;
  InputTask: InputTask;
  Int: Scalars['Int']['output'];
  LoadMoreVars: LoadMoreVars;
  Mutation: {};
  Query: {};
  StatusResponse: StatusResponse;
  String: Scalars['String']['output'];
  Task: Task;
  UpdatedTaskInput: UpdatedTaskInput;
}>;

export type CompletedTasksResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CompletedTasks'] = ResolversParentTypes['CompletedTasks']> = ResolversObject<{
  dates?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteTask?: Resolver<Maybe<ResolversTypes['StatusResponse']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  saveTask?: Resolver<Maybe<ResolversTypes['StatusResponse']>, ParentType, ContextType, RequireFields<MutationSaveTaskArgs, 'newTask'>>;
  updateTask?: Resolver<Maybe<ResolversTypes['StatusResponse']>, ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'updatedTask'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getCompletedTasks?: Resolver<Maybe<ResolversTypes['CompletedTasks']>, ParentType, ContextType, RequireFields<QueryGetCompletedTasksArgs, 'loadMoreVars'>>;
  getTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  getTasksByDate?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType, RequireFields<QueryGetTasksByDateArgs, 'dates'>>;
}>;

export type StatusResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['StatusResponse'] = ResolversParentTypes['StatusResponse']> = ResolversObject<{
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TaskResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completedOn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reminders?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  CompletedTasks?: CompletedTasksResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StatusResponse?: StatusResponseResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
}>;

