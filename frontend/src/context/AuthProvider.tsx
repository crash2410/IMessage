"use client";
import {SessionProvider} from "next-auth/react";
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {ReactNode} from "react";
import {theme} from "@/chakra/chakra";
import {ApolloProvider} from "@apollo/client";
import {client} from "@/graphql/apollo-client";

export default function AuthProvider({children,}: {
    children: ReactNode;
}) {
    return <ApolloProvider client={client}>
        <SessionProvider>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </SessionProvider>
    </ApolloProvider>;
}
