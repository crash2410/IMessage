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
import {useLazyQuery, useMutation} from "@apollo/client";
import UserOperations from "@/graphql/operations/user";
import ConversationOperations from "@/graphql/operations/conversation";
import {
    CreateConversationData,
    CreateConversationInput,
    SearchedUser,
    SearchUsersData,
    SearchUsersInput
} from "@/util/types";
import UserSearchList from "@/component/Chat/Conversations/Modal/UserSearchList";
import Participants from "@/component/Chat/Conversations/Modal/Participants";
import toast from "react-hot-toast";
import {Session} from "next-auth";

interface ModalProp {
    session: Session,
    isOpen: boolean,
    onClose: () => void
}

const ConversationsModal: FC<ModalProp> = ({isOpen,onClose, session}) => {
    const {user:{id: userId}} = session

    const [username, setUsername] = useState<string>("");
    const [participants, setParticipants] = useState<Array<SearchedUser>>([])
    const [searchUsers, { data, error, loading }] = useLazyQuery<SearchUsersData, SearchUsersInput>(UserOperations.Queries.searchUsers);
    const [createConversation, {loading: createConversationLoading}] = useMutation<CreateConversationData, CreateConversationInput>(ConversationOperations.Mutations.createConversation)

    const onCreateConversation = async () => {
        const participantsIds = [userId, ...participants.map(p => p.id)]

        try {
        const {data} = await createConversation({
            variables: {
                participantsIds
            }
        })
            console.log(`onCreateConversation DATA`, data)
        } catch (error: any){
            console.error("onCreateConversation ERROR:",error);
            toast.error(error?.message)
        }
    }

    const onSearch = async (event : FormEvent) => {
        event.preventDefault();

        await searchUsers({variables: {username}});
    }

    const addParticipants = (user: SearchedUser) => {
        setParticipants(prev => [...prev, user]);
        setUsername("")
    }

    const removeParticipant = (userId: string) => {
        setParticipants(prevState => prevState.filter(p => p.id !== userId))
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent bg="gray.800" pb={4}>
                    <ModalHeader>Найти или создать беседу</ModalHeader>
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
                        {data?.searchUsers && <UserSearchList users={data?.searchUsers} addParticipants={addParticipants}/>}
                        {participants.length !== 0 &&
                        <>
                            <Participants participants={participants} removeParticipant={removeParticipant}/>
                            <Button
                                bg="brand.100"
                                width="100%"
                                mt={6}
                                _hover={{bg:"brand.100"}}
                                isLoading={createConversationLoading}
                                onClick={onCreateConversation}
                            >Создать беседу</Button>
                        </>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};

export default ConversationsModal;