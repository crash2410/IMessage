"use client"
import {useSession} from "next-auth/react";
import SignInButton from "@/component/SignInButton/SignInButton";
import {redirect} from "next/navigation";

export default function Page() {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            redirect(`api/auth/signin?callbackUrl=/client`)
        }
    })

    console.log(session)


    return (
        <div>
            <SignInButton/>
        </div>
    )
}
