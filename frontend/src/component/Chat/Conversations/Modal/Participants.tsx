import {SearchedUser} from "@/util/types";
import {Flex, Stack, Text} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";


interface ParticipantsProps {
    participants: Array<SearchedUser>;
    removeParticipant: (userId: string) => void
}

const Participants = ({participants, removeParticipant} : ParticipantsProps) => {
    return (
      <Flex mt={8} gap="10px" flexWrap="wrap">
          {participants.map(participant => {
              return <>
                  <Stack
                      key={participant.id}
                      direction="row"
                      align="center"
                      bg="whiteAlpha.200"
                      borderRadius={4} p={2}
                  >
                        <Text>{participant.username}</Text>
                        <AiOutlineCloseCircle size={20} cursor="pointer" onClick={() => removeParticipant(participant.id)}/>
                  </Stack>
              </>
          })}
      </Flex>
    );
};

export default Participants;