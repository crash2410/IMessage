"use client";
import {SessionProvider} from "next-auth/react";
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {ReactNode} from "react";
import {theme} from "@/chakra/chakra";
import {ApolloProvider} from "@/graphql/apollo-provider";
import {Toaster} from "react-hot-toast";

export default function AuthProvider({children,}: {
    children: ReactNode;
}) {

    return <ApolloProvider>
        <SessionProvider>
            <ChakraProvider theme={theme}>
                <Toaster
                    position="top-center"
                />
                {children}
            </ChakraProvider>
        </SessionProvider>
    </ApolloProvider>;
}
