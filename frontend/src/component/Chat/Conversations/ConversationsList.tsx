import {FC, useState} from "react";
import {Session} from "next-auth";
import {Box, Text} from "@chakra-ui/react";
import ConversationsModal from './Modal/Modal'

interface ConversationsListProps {
    session: Session
}

const ConversationsList: FC<ConversationsListProps> = ({session}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <Box width={"100%"}>
            <Box
                py={2}
                px={4}
                mb={4}
                bg="blackAlpha.300"
                borderRadius={4}
                cursor="pointer"
                onClick={onOpen}
            >
                <Text
                    textAlign="center"
                    color="whiteAlpha.800"
                    fontWeight={500}>
                    Найти или начать беседу
                </Text>
            </Box>
            <ConversationsModal isOpen={isOpen} onClose={onClose}/>
        </Box>
    );
};

export default ConversationsList;