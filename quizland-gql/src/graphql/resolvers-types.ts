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
  provider?: Maybe<ProviderType>;
  providerAccountId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AddCardInput = {
  card: CardInput;
  id: Scalars['ID'];
  index: Scalars['Int'];
};

export type AuthenticateUserPayload = {
  __typename?: 'AuthenticateUserPayload';
  expiresAt: Scalars['DateTime'];
  token: Scalars['String'];
  user: User;
};

export type Card = {
  __typename?: 'Card';
  definition: Array<Scalars['String']>;
  term: Scalars['String'];
};

export type CardInput = {
  definition: Array<Scalars['String']>;
  term: Scalars['String'];
};

export type CardSet = Item & {
  __typename?: 'CardSet';
  cards: Array<Card>;
  definitionLng?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  modified?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: User;
  permissions?: Maybe<Array<Permit>>;
  termLng?: Maybe<Scalars['String']>;
};

export type CheckTokenPayload = {
  __typename?: 'CheckTokenPayload';
  expiresAt: Scalars['DateTime'];
  token?: Maybe<Scalars['String']>;
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
  id: Scalars['ID'];
  modified?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: User;
  permissions?: Maybe<Array<Permit>>;
};

export type Group = {
  __typename?: 'Group';
  id?: Maybe<Scalars['ID']>;
  members?: Maybe<Array<Maybe<User>>>;
  modified?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
};

export type Item = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  modified?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: User;
  permissions?: Maybe<Array<Permit>>;
};

export enum ItemType {
  CardSet = 'CARD_SET',
  Folder = 'FOLDER'
}

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUser?: Maybe<AuthenticateUserPayload>;
  checkPermission?: Maybe<Permission>;
  connectAccount?: Maybe<Scalars['Void']>;
  createCardSet?: Maybe<CardSet>;
  createFolder?: Maybe<Folder>;
  deleteItem?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Void']>;
  getItem?: Maybe<Item>;
  moveItem?: Maybe<Scalars['Boolean']>;
  removeCardSet?: Maybe<Scalars['Void']>;
  updateCards?: Maybe<CardSet>;
  updateItem?: Maybe<CardSet>;
  updatePermission?: Maybe<Scalars['Boolean']>;
};


export type MutationAuthenticateUserArgs = {
  code: Scalars['String'];
  provider: ProviderType;
};


export type MutationCheckPermissionArgs = {
  id: Scalars['ID'];
  user: Scalars['ID'];
};


export type MutationConnectAccountArgs = {
  code: Scalars['String'];
  provider: ProviderType;
};


export type MutationCreateCardSetArgs = {
  cards: Array<CardInput>;
  description?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};


export type MutationCreateFolderArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parent?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationGetItemArgs = {
  id: Scalars['ID'];
};


export type MutationMoveItemArgs = {
  from: Scalars['ID'];
  id: Scalars['ID'];
  to: Scalars['ID'];
};


export type MutationRemoveCardSetArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCardsArgs = {
  cars: Array<CardInput>;
};


export type MutationUpdateItemArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePermissionArgs = {
  id: Scalars['ID'];
  user: Scalars['ID'];
};

export enum Permission {
  M = 'M',
  R = 'R',
  W = 'W'
}

export type Permit = {
  group?: Maybe<Scalars['ID']>;
  permission: Permission;
  user?: Maybe<Scalars['ID']>;
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
  checkToken?: Maybe<CheckTokenPayload>;
  discoverCardSets?: Maybe<Array<Scalars['ID']>>;
  getCardSet?: Maybe<CardSet>;
  getUser?: Maybe<User>;
  getUserByAccount?: Maybe<User>;
  getUserByEmail?: Maybe<User>;
  getUserByID?: Maybe<User>;
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

export enum Role {
  Admin = 'ADMIN',
  Server = 'SERVER',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  surname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
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
  AuthenticateUserPayload: ResolverTypeWrapper<AuthenticateUserPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Card: ResolverTypeWrapper<Card>;
  CardInput: CardInput;
  CardSet: ResolverTypeWrapper<CardSet>;
  CheckTokenPayload: ResolverTypeWrapper<CheckTokenPayload>;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Folder: ResolverTypeWrapper<Folder>;
  Group: ResolverTypeWrapper<Group>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Item: ResolversTypes['CardSet'] | ResolversTypes['Folder'];
  ItemType: ItemType;
  Mutation: ResolverTypeWrapper<{}>;
  Permission: Permission;
  Permit: never;
  ProviderType: ProviderType;
  Query: ResolverTypeWrapper<{}>;
  RemoveCardInput: RemoveCardInput;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  AddCardInput: AddCardInput;
  AuthenticateUserPayload: AuthenticateUserPayload;
  Boolean: Scalars['Boolean'];
  Card: Card;
  CardInput: CardInput;
  CardSet: CardSet;
  CheckTokenPayload: CheckTokenPayload;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  Folder: Folder;
  Group: Group;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Item: ResolversParentTypes['CardSet'] | ResolversParentTypes['Folder'];
  Mutation: {};
  Permit: never;
  Query: {};
  RemoveCardInput: RemoveCardInput;
  String: Scalars['String'];
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
  provider?: Resolver<Maybe<ResolversTypes['ProviderType']>, ParentType, ContextType>;
  providerAccountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthenticateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticateUserPayload'] = ResolversParentTypes['AuthenticateUserPayload']> = ResolversObject<{
  expiresAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = ResolversObject<{
  definition?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  term?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardSet'] = ResolversParentTypes['CardSet']> = ResolversObject<{
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  definitionLng?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permit']>>, ParentType, ContextType>;
  termLng?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CheckTokenPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckTokenPayload'] = ResolversParentTypes['CheckTokenPayload']> = ResolversObject<{
  expiresAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Folder'] = ResolversParentTypes['Folder']> = ResolversObject<{
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permit']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CardSet' | 'Folder', ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permit']>>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  authenticateUser?: Resolver<Maybe<ResolversTypes['AuthenticateUserPayload']>, ParentType, ContextType, RequireFields<MutationAuthenticateUserArgs, 'code' | 'provider'>>;
  checkPermission?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType, RequireFields<MutationCheckPermissionArgs, 'id' | 'user'>>;
  connectAccount?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationConnectAccountArgs, 'code' | 'provider'>>;
  createCardSet?: Resolver<Maybe<ResolversTypes['CardSet']>, ParentType, ContextType, RequireFields<MutationCreateCardSetArgs, 'cards' | 'name'>>;
  createFolder?: Resolver<Maybe<ResolversTypes['Folder']>, ParentType, ContextType, RequireFields<MutationCreateFolderArgs, 'name'>>;
  deleteItem?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  getItem?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationGetItemArgs, 'id'>>;
  moveItem?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMoveItemArgs, 'from' | 'id' | 'to'>>;
  removeCardSet?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationRemoveCardSetArgs, 'id'>>;
  updateCards?: Resolver<Maybe<ResolversTypes['CardSet']>, ParentType, ContextType, RequireFields<MutationUpdateCardsArgs, 'cars'>>;
  updateItem?: Resolver<Maybe<ResolversTypes['CardSet']>, ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'id'>>;
  updatePermission?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdatePermissionArgs, 'id' | 'user'>>;
}>;

export type PermitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permit'] = ResolversParentTypes['Permit']> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  group?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  permission?: Resolver<ResolversTypes['Permission'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  checkToken?: Resolver<Maybe<ResolversTypes['CheckTokenPayload']>, ParentType, ContextType>;
  discoverCardSets?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  getCardSet?: Resolver<Maybe<ResolversTypes['CardSet']>, ParentType, ContextType, RequireFields<QueryGetCardSetArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getUserByAccount?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByAccountArgs, 'provider' | 'providerAccountId'>>;
  getUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  getUserByID?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  AuthenticateUserPayload?: AuthenticateUserPayloadResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  CardSet?: CardSetResolvers<ContextType>;
  CheckTokenPayload?: CheckTokenPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Folder?: FolderResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Permit?: PermitResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  internal?: InternalDirectiveResolver<any, any, ContextType>;
  permitted?: PermittedDirectiveResolver<any, any, ContextType>;
  private?: PrivateDirectiveResolver<any, any, ContextType>;
  server?: ServerDirectiveResolver<any, any, ContextType>;
}>;
