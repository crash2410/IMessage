import { Session } from "next-auth";
import {Db, MongoClient, ObjectId} from "mongodb";



export interface GraphQLContext {
    session: Session | null;
    mongodb: Db,
    mongoClient: MongoClient | null
    // pubsub
}

/**
 * Users
 * */

export interface CreateUsernameResponse {
    success?: boolean;
    error?: string
}

export interface SearchUsersResponse {
    _id?: string;
    name?: string;
    email?: string;
    image?: string;
    emailVerified?:  any,
    username?: string,
}

export interface ErrorResponse {
    error: string;
}