import {gql} from "graphql-tag";
export const typeDefs = gql`    
type Query {
    getUsers: [User]
    getUser(id: ID!): User
}

enum Permission {
    R
    RW
    M
}

interface Permit {
    user(id: ID!): User
    permission: Permission
}

interface Item {
    id: ID!
    name: String!
    description: String
    owner(id: ID!): User
    permissions: [Permit!]
}

type Card {
    term: String
    definition: [String]
}
type CardSet implements Item {
    id: ID!
    name: String!
    description: String
    owner(id: ID!): User
    permissions: [Permit!]
    cards: [Card!]!
}

type Folder implements Item {
    id: ID!
    name: String!
    description: String
    owner(id: ID!): User
    permissions: [Permit!]
    children: [Item]
}

type User {
    id: ID!
    username: String!
}`