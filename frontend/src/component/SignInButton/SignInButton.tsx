'use client';

import {signIn, useSession} from "next-auth/react";

export default function SignInButton() {
    const {data} = useSession()
    return (
        <>
            <button onClick={() => signIn()}>Sign In</button>
            {data?.user?.name}
        </>
    );
}
