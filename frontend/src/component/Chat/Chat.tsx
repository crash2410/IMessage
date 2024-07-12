"use client"
import {FC} from "react";
import {Button} from "@chakra-ui/react";
import {signOut} from "next-auth/react";

interface ChatProps {

}

const Chat: FC<ChatProps> = () => {
    return (
        <div>
            CHAT

            <Button onClick={() => signOut()}>Logout</Button>
        </div>
    );
};

export default Chat;