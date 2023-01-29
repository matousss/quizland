import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Void: any;
};

export type Account = {
  __typename?: 'Account';
  accessToken?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  idToken?: Maybe<Scalars['String']>;
  provider?: Maybe<ProviderType>;
  providerAccountId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};


export type AccountUserArgs = {
  id: Scalars['ID'];
};

export type AddCardInput = {
  card: CardInput;
  id: Scalars['ID'];
  index: Scalars['Int'];
};

export type AuthenticateUserInput = {
  provider: ProviderType;
  secret: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  definition?: Maybe<Array<Maybe<Scalars['String']>>>;
  term?: Maybe<Scalars['String']>;
};

export type CardInput = {
  definition: Array<Scalars['String']>;
  term: Scalars['String'];
};

export type CardSet = Item & {
  __typename?: 'CardSet';
  cards: Array<Card>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  permissions?: Maybe<Array<Permit>>;
};


export type CardSetOwnerArgs = {
  id: Scalars['ID'];
};

export type CreateCardSetInput = {
  cards?: InputMaybe<Array<InputMaybe<CardInput>>>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Folder = Item & {
  __typename?: 'Folder';
  children?: Maybe<Array<Maybe<Item>>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  permissions?: Maybe<Array<Permit>>;
};


export type FolderOwnerArgs = {
  id: Scalars['ID'];
};

export type Item = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  permissions?: Maybe<Array<Permit>>;
};


export type ItemOwnerArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCard?: Maybe<Scalars['Boolean']>;
  createCardSet?: Maybe<Scalars['Boolean']>;
  createUser?: Maybe<User>;
  deleteUser?: Maybe<Scalars['Void']>;
  removeCard?: Maybe<Scalars['Boolean']>;
  removeCardSet?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<User>;
};


export type MutationAddCardArgs = {
  input?: InputMaybe<AddCardInput>;
};


export type MutationCreateCardSetArgs = {
  input?: InputMaybe<CreateCardSetInput>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCardArgs = {
  input?: InputMaybe<RemoveCardInput>;
};


export type MutationRemoveCardSetArgs = {
  input?: InputMaybe<RemoveCardSetInput>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export enum Permission {
  M = 'M',
  R = 'R',
  Rw = 'RW'
}

export type Permit = {
  permission?: Maybe<Permission>;
  user?: Maybe<User>;
};


export type PermitUserArgs = {
  id: Scalars['ID'];
};

export enum ProviderType {
  Discord = 'DISCORD',
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Twitter = 'TWITTER'
}

export type Query = {
  __typename?: 'Query';
  authenticateUser?: Maybe<Token>;
  getCardSet?: Maybe<CardSet>;
  getUser?: Maybe<User>;
  getUserByAccount?: Maybe<User>;
  getUserByEmail?: Maybe<User>;
  getUserByID?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryAuthenticateUserArgs = {
  code: Scalars['String'];
  provider: ProviderType;
};


export type QueryGetCardSetArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserByAccountArgs = {
  provider: ProviderType;
  providerAccountId: Scalars['ID'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID'];
};

export type RemoveCardInput = {
  id: Scalars['ID'];
  index: Scalars['Int'];
};

export type RemoveCardSetInput = {
  id: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  expires?: Maybe<Scalars['DateTime']>;
  token?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  accounts?: Maybe<Array<Maybe<Account>>>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<Maybe<Token>>>;
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
  Account: ResolverTypeWrapper<Account>;
  AddCardInput: AddCardInput;
  AuthenticateUserInput: AuthenticateUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Card: ResolverTypeWrapper<Card>;
  CardInput: CardInput;
  CardSet: ResolverTypeWrapper<CardSet>;
  CreateCardSetInput: CreateCardSetInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Folder: ResolverTypeWrapper<Folder>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Item: ResolversTypes['CardSet'] | ResolversTypes['Folder'];
  Mutation: ResolverTypeWrapper<{}>;
  Permission: Permission;
  Permit: never;
  ProviderType: ProviderType;
  Query: ResolverTypeWrapper<{}>;
  RemoveCardInput: RemoveCardInput;
  RemoveCardSetInput: RemoveCardSetInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Token: ResolverTypeWrapper<Token>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  AddCardInput: AddCardInput;
  AuthenticateUserInput: AuthenticateUserInput;
  Boolean: Scalars['Boolean'];
  Card: Card;
  CardInput: CardInput;
  CardSet: CardSet;
  CreateCardSetInput: CreateCardSetInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  Folder: Folder;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Item: ResolversParentTypes['CardSet'] | ResolversParentTypes['Folder'];
  Mutation: {};
  Permit: never;
  Query: {};
  RemoveCardInput: RemoveCardInput;
  RemoveCardSetInput: RemoveCardSetInput;
  String: Scalars['String'];
  Token: Token;
  UpdateUserInput: UpdateUserInput;
  User: User;
  Void: Scalars['Void'];
}>;

export type InternalDirectiveArgs = { };

export type InternalDirectiveResolver<Result, Parent, ContextType = any, Args = InternalDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type PermittedDirectiveArgs = {
  required?: Maybe<Permission>;
};

export type PermittedDirectiveResolver<Result, Parent, ContextType = any, Args = PermittedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type PrivateDirectiveArgs = { };

export type PrivateDirectiveResolver<Result, Parent, ContextType = any, Args = PrivateDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ServerDirectiveArgs = { };

export type ServerDirectiveResolver<Result, Parent, ContextType = any, Args = ServerDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  idToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['ProviderType']>, ParentType, ContextType>;
  providerAccountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<AccountUserArgs, 'id'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = ResolversObject<{
  definition?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  term?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardSet'] = ResolversParentTypes['CardSet']> = ResolversObject<{
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<CardSetOwnerArgs, 'id'>>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permit']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = ResolversObject<{
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<FolderOwnerArgs, 'id'>>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permit']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CardSet' | 'Folder', ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<ItemOwnerArgs, 'id'>>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permit']>>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addCard?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationAddCardArgs>>;
  createCardSet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationCreateCardSetArgs>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  removeCard?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationRemoveCardArgs>>;
  removeCardSet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationRemoveCardSetArgs>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
}>;

export type PermitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permit'] = ResolversParentTypes['Permit']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  permission?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<PermitUserArgs, 'id'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  authenticateUser?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QueryAuthenticateUserArgs, 'code' | 'provider'>>;
  getCardSet?: Resolver<Maybe<ResolversTypes['CardSet']>, ParentType, ContextType, RequireFields<QueryGetCardSetArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUserByAccount?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByAccountArgs, 'provider' | 'providerAccountId'>>;
  getUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  getUserByID?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  expires?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Account']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['Token']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  CardSet?: CardSetResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Folder?: FolderResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Permit?: PermitResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  internal?: InternalDirectiveResolver<any, any, ContextType>;
  permitted?: PermittedDirectiveResolver<any, any, ContextType>;
  private?: PrivateDirectiveResolver<any, any, ContextType>;
  server?: ServerDirectiveResolver<any, any, ContextType>;
}>;
