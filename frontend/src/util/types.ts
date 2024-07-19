export interface CreateUsernameData {
    createUserName: {
        success: boolean,
        error: string
    }
}

export interface CrateUsernameVariables {
    username: string
}

export interface SearchUsersInput {
    username: string
}

export interface SearchUsersData {
    searchUsers: Array<SearchedUser>
}

export interface SearchedUser {
    id: string,
    username: string
}