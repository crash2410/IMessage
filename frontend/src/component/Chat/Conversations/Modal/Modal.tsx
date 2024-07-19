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

interface ModalProp {
    isOpen: boolean,
    onClose: () => void
}

const ConversationsModal: FC<ModalProp> = ({isOpen,onClose}) => {
    const [username, setUsername] = useState<string>("");

    const onSearch = async (event : FormEvent) => {
        event.preventDefault();

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