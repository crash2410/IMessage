import {CreateUsernameResponse, ErrorResponse, GraphQLContext, SearchUsersResponse} from "@/util/types";
import {ObjectId} from "mongodb";


type SearchUsers = SearchUsersResponse[] | ErrorResponse;

const resolvers = {
    Query: {
        searchUsers: async  (_: any, args: {username: string}, context: GraphQLContext): Promise<SearchUsers> => {
            const { username: searchedUsername } = args;
            const {mongodb, session} = context;

            const users = mongodb.collection('users');
            if (!session || !session.user) {
                return {
                    error: "Not authorized"
                };
            }

            const user = session.user as { id: string; username: string };

            try {

                const usersCollection = mongodb.collection('users');
                const userList = await usersCollection.aggregate([
                    {
                        $match: {
                            $and: [
                                { username: { $regex: searchedUsername, $options: 'i' }  },
                                { username: { $ne: user.username } }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            id: { $toString: "$_id" }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray();

                return userList
            } catch (error : any) {
                console.error("searchUsers ERROR:",error.message)
                return {
                    error: error.message,
                }
            }

        }
    },
    Mutation: {
        createUsername: async  (_: any, args: {username: string}, context: GraphQLContext) => {
            const { username } = args;
            const {mongodb, session} = context;

            const users = mongodb.collection('users');

            if (!session || !session.user) {
                return {
                    error: "Not authorized"
                };
            }
            const user = session.user as { id: string; username: string };

            if (!session?.user){
                return {
                    error: "Not authorized"
                }
            }

            try {
                /**
                 * Проверяем, что имя пользователя не занято
                 */
                const userList = await users.findOne(
                    {username: username}
                )

                if (userList){
                    return {
                        error: "Имя пользователя занятно. Попробуй другое."
                    }
                }

                /**
                 * Обновление пользователя
                 */
                await users.updateOne({ _id: new ObjectId(user.id) }, { $set: { username } });

                return { success: true}

            } catch (error: any) {
                console.error("createUsername ERROR:",error)
                return {
                    error: error.message,
                }
            }

        }
    }
}

export  default  resolvers;