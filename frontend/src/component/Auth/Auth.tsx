"use client"
import {FC, useState} from "react";
import {Button, Center, Input, Stack, Text} from "@chakra-ui/react";
import {signIn} from "next-auth/react";
import {Session} from "next-auth";

interface AuthProps {
    session: Session | null;
}

const Auth: FC<AuthProps> = ({
                                 session
                             }) => {
    const [username, setUsername] = useState<string>("");

    const reloadSession = () => {

    }


    const onSubmit = async () => {
        try {

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