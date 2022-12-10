import type {MongoClient} from "mongodb"

const users = [
    {
        id: '1',
        name: 'user001'
    },
    {
        id: '2',
        name: 'user002'
    }
]

export const getResolvers = (client: MongoClient) => (
    {
        Query: {
            getUsers: () => users
        }
    }
)

