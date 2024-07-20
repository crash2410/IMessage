import {GraphQLContext} from "@/util/types";
import { v4 as uuidv4 } from 'uuid';
import {MongoClient, ObjectId} from "mongodb";

const resolvers = {
    Mutation: {
        createConversation: async (_: any, args: {participantsIds: Array<string>}, context: GraphQLContext) => {
            const { participantsIds } = args;
            const {mongodb, session, mongoClient} = context;

            if (!session || !session.user || mongoClient === null) {
                return {
                    error: "Not authorized"
                };
            }

            const conversationsCollection = mongodb.collection('conversations');
            const participantsCollection = mongodb.collection('conversationParticipants');
            const messagesCollection = mongodb.collection('messages');

            const user = session.user as { id: string; username: string };

            const sessionMongo = mongoClient.startSession();

            try {
                // Начинаем транзакцию
                sessionMongo.startTransaction();

                // Создаем новую запись в conversations
                const conversationResult = await conversationsCollection.insertOne({
                    participants: [], // Здесь будут ссылки на участников
                    latestMessage: null,
                    latestMessageId: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                const conversationId = conversationResult.insertedId;


                console.log(participantsIds)
                // Добавляем участников
                const participantsDocs = participantsIds.map(id => ({
                    userId: id,
                    conversationId: conversationId.toString(),
                    hasSeenLatestMessage: id === user.id
                }));

                const participantsResult = await participantsCollection.insertMany(participantsDocs);

                // Обновляем массив участников в conversation
                await conversationsCollection.updateOne(
                    { _id: conversationId },
                    { $set: { participants: participantsResult.insertedIds } }
                );

                // Завершаем транзакцию
                await sessionMongo.commitTransaction();
                await sessionMongo.endSession();

                return { conversationId: conversationId.toString() };

            } catch (error: any) {
                console.error("searchUsers ERROR:",error.message)
                await sessionMongo.abortTransaction();
                await sessionMongo.endSession();
                return {
                    error: error.message,
                }

            }

        }
    }
}

export default resolvers