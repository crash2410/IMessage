"use server"
import {getServerSession, Session} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {Box} from "@chakra-ui/react";
import Chat from "@/component/Chat/Chat";
import Auth from "@/component/Auth/Auth";

export default async function Page() {
    const session  = await getServerSession(options);


    return (
        <Box>
                {session?.user?.username ? <Chat/> : <Auth session={session}/>}
            </Box>
    )
}
