import {
  Button,
  Divider,
  Flex,
  Grid,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useNavigate } from "react-router-dom";

import defaultImage from "@/assets/default-image.svg";
import colorSet from "@/styles/color-set";
import { Team } from "@/types/interfaces";
import Paths from "@/types/paths";
import { divisionToKorean } from "@/utils/utils";

interface CelebrityCardProps {
  team: Team;
}

const CelebrityCard = ({ team }: CelebrityCardProps) => {
  const { teamName, mainPicture, shortIntro, teamMany, division } = team;

  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(Paths.TeamDetail + team.id);
      }}
    >
      <Flex
        gap={"20px"}
        style={{
          border: `1px solid ${colorSet.lineGray}`,
          padding: "20px",
        }}
      >
        <Flex flexDirection={"column"} width={"30%"} justifyContent={"center"}>
          <img
            src={mainPicture?.storedFilePath || defaultImage}
            alt={teamName}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              height: "auto",
            }}
          />
        </Flex>

        <Flex flexDirection={"column"} flex={"1"} gap={"10px"}>
          <Flex flexDirection={"column"}>
            <Text size={"18px"} textAlign={"start"}>
              {teamName}
            </Text>
            <Grid gridTemplateColumns={"4fr 1fr"}>
              <Text
                size={"16px"}
                color={colorSet.textLight}
                textAlign={"start"}
                style={{
                  flexGrow: 3,
                }}
              >
                {shortIntro}
              </Text>
            </Grid>
          </Flex>

          <Spacer height={"1px"} />

          <Divider />

          <Flex gap={"10px"}>
            <Text size={"12px"} color={colorSet.textLight}>
              {divisionToKorean(division)}
            </Text>
            <Divider vertical={true} />
            <Text size={"12px"} color={colorSet.textLight}>
              {teamMany}명
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Button>
  );
};

export default CelebrityCard;
