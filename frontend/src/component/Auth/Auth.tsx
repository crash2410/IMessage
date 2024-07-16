"use client"
import {FC, useState} from "react";
import {Button, Center, Input, Stack, Text} from "@chakra-ui/react";
import {signIn} from "next-auth/react";
import {Session} from "next-auth";
import {useMutation} from "@apollo/client";
import UserOperations from '../../graphql/operations/user'
import {CrateUsernameVariables, CreateUsernameData} from "@/util/types";

interface AuthProps {
    session: Session | null;
}


const Auth: FC<AuthProps> = ({
                                 session
                             }) => {
    const [username, setUsername] = useState<string>("");
    const [createUsername, {data, loading, error}] = useMutation<CreateUsernameData, CrateUsernameVariables>(UserOperations.Mutations.createUsername);

    const reloadSession = () => {

    }


    const onSubmit = async () => {
        if (!username) return;

        try {
            await createUsername({ variables: {username}});
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <Center height={"100vh"}>
            <Stack spacing={8} align="center">
                {session ? (
                    <>
                        <Text fontSize={"3xl"}>Создайте логин</Text>
                        <Input
                            placeholder="Введите логин"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <Button width={"100%"} onClick={onSubmit}>Сохранить</Button>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl">Мессенджер</Text>
                        <Button onClick={() => signIn()}>Авторизоваться</Button>
                    </>
                )}
            </Stack>
        </Center>
    );
};

export default Auth;