import {GraphQLContext} from "@/util/types";
import {ObjectId} from "mongodb";


const resolvers = {
    Query: {
        searchUsers: () => {}
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

            } catch (error) {
                console.error("createUsername ERROR:",error)
                return {
                    error: "createUsername ERROR:",
                }
            }

        }
    }
}

export  default  resolvers;