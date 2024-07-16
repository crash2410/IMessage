"use client";

import {ApolloLink, HttpLink} from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import {PropsWithChildren} from "react";

function makeClient() {

    const httpLink = new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include"
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

export function ApolloProvider({children}: PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}