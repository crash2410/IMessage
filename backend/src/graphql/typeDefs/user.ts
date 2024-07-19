const typeDefs = `#graphql
    
    type SearchUser {
        id: String
        username: String
    }

    type Query {
        searchUsers(username : String): [SearchUser]
    }
    
    type Mutation {
        createUsername(username : String): CreateUsernameResponse
    }

    type CreateUsernameResponse {
        success: Boolean,
        error: String
    }
`

export default typeDefs;