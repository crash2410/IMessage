'use client';

import {signOut, useSession} from "next-auth/react";

export default function SignOutButton() {
    const {data} = useSession()

    return (
        <>
            <button onClick={() => signOut()}>Sign Out</button>
        </>
    );
}
