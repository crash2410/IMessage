// src/db.ts
import {MongoClient, Db, ServerApiVersion} from 'mongodb';
import * as dotenv from "dotenv"

let client: MongoClient;
let db: Db;

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

export async function connectToDatabase(): Promise<void> {
    if (db) return; // Если база данных уже подключена, ничего не делаем

    dotenv.config();
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const dbName = 'users_messenger';

    try {
        client = new MongoClient(uri, options);

        await client.connect();
        console.log('Connected to MongoDB');

        db = client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export function getDb(): Db {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

export async function closeConnection(): Promise<void> {
    if (client) {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}
