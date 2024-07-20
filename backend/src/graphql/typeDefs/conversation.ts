import {graphql} from "graphql/graphql";

const typeDefs = `#graphql

    type Mutation {
        createConversation(participantsIds: [String]): CreateConversationResponse
    }

    type CreateConversationResponse {
        conversationId: String
    }

`

export default typeDefs