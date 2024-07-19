import {FC, FormEvent, useState} from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Stack,
    Text,
} from "@chakra-ui/react";
import {useLazyQuery} from "@apollo/client";
import UserOperations from "@/graphql/operations/user";
import {SearchUsersData, SearchUsersInput} from "@/util/types";

interface ModalProp {
    isOpen: boolean,
    onClose: () => void
}

const ConversationsModal: FC<ModalProp> = ({isOpen,onClose}) => {
    const [username, setUsername] = useState<string>("");
    const [searchUsers, { data, error, loading }] = useLazyQuery<SearchUsersData, SearchUsersInput>(UserOperations.Queries.searchUsers);

    console.log(data, "USERS LIST")

    const onSearch = async (event : FormEvent) => {
        event.preventDefault();

        await searchUsers({variables: {username}});
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent bg="gray.800" pb={4}>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <form onSubmit={onSearch}>
                            <Stack spacing={4}>
                             <Input
                                 placeholder={"Введите имя пользователя"}
                                 value={username}
                                 onChange={event => setUsername(event.target.value)}/>
                             <Button type={"submit"} disabled={!username}>Найти</Button>
                            </Stack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};

export default ConversationsModal;