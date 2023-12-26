import { Button, Flex } from "@dohyun-ko/react-atoms";

import defaultImage from "@/assets/default-image.svg";
import { Team } from "@/types/interfaces";

interface SystemCardProps {
  team: Team;
}

const SystemCard = ({ team }: SystemCardProps) => {
  const { teamName, mainPicture } = team;

  return (
    <Button>
      <Flex>
        <img
          src={mainPicture?.storedFilePath || defaultImage}
          alt={teamName}
          style={{
            width: "100%",
          }}
        />
      </Flex>
    </Button>
  );
};

export default SystemCard;
