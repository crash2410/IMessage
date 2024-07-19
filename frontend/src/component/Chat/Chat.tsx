"use client"
import {FC} from "react";
import {Button, Flex} from "@chakra-ui/react";
import {signOut} from "next-auth/react";
import ConversationsWrapper from "@/component/Chat/Conversations/ConversationsWrapper";
import FeedWrapper from "@/component/Chat/Feed/FeedWrapper";
import {Session} from "next-auth";

interface ChatProps {
    session: Session
}

const Chat: FC<ChatProps> = ({session}) => {
    return (
        <Flex height="100vh">
            <ConversationsWrapper session={session}/>
            <FeedWrapper session={session}/>
        </Flex>
    );
};

export default Chat;