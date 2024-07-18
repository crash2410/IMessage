import { Session } from "next-auth";
import {Db} from "mongodb";



export interface GraphQLContext {
    session: Session | null;
    mongodb: Db
    // pubsub
}

/**
 * Users
 * */

export interface CreateUsernameResponse {
    success?: boolean;
    error?: string
}