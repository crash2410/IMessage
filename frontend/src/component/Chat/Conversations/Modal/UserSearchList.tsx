import {FC} from "react";
import {SearchedUser} from "@/util/types";
import {Avatar, Flex, Stack, Text, Button} from "@chakra-ui/react";

interface UserSearchListProps {
    users: Array<SearchedUser>;
    addParticipants: (user: SearchedUser) => void
}

const UserSearchList = ({users, addParticipants} : UserSearchListProps) => {
    return (
        <>
            {users.length === 0 ? (
                <Flex mt={6} justify="center">
                    <Text>Пользователи не найдены</Text>
                </Flex>
            ): (
                <Stack mt={6}>
                    {
                        users.map((user) => {
                            console.log(user.username)
                            return   <Stack key={user.id} direction="row" align="center" spacing={4} py={2} px={4} borderRadius={4} _hover={{bg: "whiteAlpha.200"}}>
                                <Avatar />
                                <Flex justify="space-between" align="center" width="100%">
                                    <Text color="whiteAlpha.700">{user.username}</Text>
                                    <Button
                                        bg="brand.100"
                                        _hover={{bg: "brand.100"}}
                                        onClick={() => addParticipants(user)}
                                    >
                                        Выбрать
                                    </Button>
                                </Flex>
                            </Stack>

                        })
                    }
                </Stack>
            )}
        </>
    );
};

export default UserSearchList;