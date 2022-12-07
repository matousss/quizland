const users = [
    {
        id: '1',
        username: 'user001'
    },
    {
        id: '2',
        username: 'user002'
    }
]

export const resolvers = {
    Query: {
        getUsers: () => users
    }
}

