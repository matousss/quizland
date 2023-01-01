import type {MongoClient} from "mongodb"

const users = [
    {
        id: '1',
        name: 'user001',
        email: 'a@b.c',
        emailVerified: null,
    },
    {
        id: '2',
        name: 'user002',
        email: 'x@y.z',
        emailVerified: null,
    }
]


export const getResolvers = (client: MongoClient) => {




    return {
        Query: {
            getUsers: () => users,
            getUserID: (parent, args, contextValue, info) => {
                console.log({parent, args, contextValue, info})
                return users.find((user) => user.id === args.id)
            },
            getUserEmail: (_, args) => users.find(user => user.email == args.email)


        }
    }
}

