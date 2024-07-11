import Google from "next-auth/providers/google"
import NextAuth from "next-auth";
import {PrismaClient} from "@prisma/client"
import {PrismaAdapter} from "@auth/prisma-adapter";

const prisma = new PrismaClient()

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
        }),
    ],
})