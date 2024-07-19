import {FC} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";

interface ModalProp {
    isOpen: boolean,
    onClose: () => void
}

const ConversationsModal: FC<ModalProp> = ({isOpen,onClose}) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>asd</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};

export default ConversationsModal;