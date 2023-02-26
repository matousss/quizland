export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  definitionLng?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
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
