"use client"
import {FC, useState} from "react";
import {Button, Center, Input, Stack, Text} from "@chakra-ui/react";
import {signIn, useSession} from "next-auth/react";
import {Session} from "next-auth";
import {useMutation} from "@apollo/client";
import UserOperations from '../../graphql/operations/user'
import {CrateUsernameVariables, CreateUsernameData} from "@/util/types";
import toast from "react-hot-toast";

interface AuthProps {
    session: Session | null;
}


const Auth: FC<AuthProps> = ({
                                 session
                             }) => {
    const [username, setUsername] = useState<string>("");
    const [createUsername, { loading, error}] = useMutation<CreateUsernameData, CrateUsernameVariables>(UserOperations.Mutations.createUsername);
    const { data: sessionData, update } = useSession();

    const onSubmit = async () => {
        if (!username) return;

        try {
           const {data} = await createUsername({ variables: {username}});

           if (data?.createUserName?.error !== null){
               toast.error("Ошибка при создании логина!");
               return;
           }

            toast.success("Логин успешно создан!");
            window.location.reload();

        } catch(error) {
            console.error(error)
        }
    }

    function getCookieValue(cookieString : string, cookieName : string) : string | null {
        const cookies = cookieString.split('; ');
        for (let cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name === cookieName) {
                return value;
            }
        }
        return null;
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