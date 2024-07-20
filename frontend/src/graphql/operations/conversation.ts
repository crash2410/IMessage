import {gql} from "@apollo/client";

export default {
    Mutations: {
        createConversation: gql`
            mutation CreateConversation($participantIds: [String]!) {
                createConversation(participantIds: $participantIds) {
                  conversationId
                }
            }
        `
    }
}