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

// TeamCard 컴포넌트의 Props를 정의합니다.
interface TeamCardProps {
  team: Team; // 공연팀 정보를 담은 객체
}

// TeamCard 컴포넌트를 정의합니다.
const TeamCard = ({ team }: TeamCardProps) => {
  // 공연팀 정보를 비구조화 할당합니다.
  const { teamName, mainPicture, shortIntro, teamMany, division } = team;

  // react-router의 useNavigate 훅을 사용하여 페이지 이동 함수를 가져옵니다.
  const navigate = useNavigate();

  return (
    // 클릭 가능한 Button 컴포넌트로 감싼 공연팀 카드입니다.
    <Button
      onClick={() => {
        navigate(Paths.TeamDetail + team.id); // 공연팀 상세페이지로 이동합니다.
      }}
    >
      {/* Flex 컴포넌트를 사용하여 유연한 레이아웃을 구성합니다. */}
      <Flex
        gap={"20px"}
        style={{
          border: `1px solid ${colorSet.lineGray}`,
          padding: "20px",
        }}
      >
        {/* 공연팀 이미지를 보여주는 부분 */}
        <Flex flexDirection={"column"} width={"30%"} justifyContent={"center"}>
          <img
            src={mainPicture?.storedFilePath || defaultImage}
            alt={teamName}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "fill",
              height: "auto",
            }}
          />
        </Flex>

        {/* 공연팀 정보를 나타내는 부분 */}
        <Flex flexDirection={"column"} flex={"1"} gap={"10px"}>
          {/* 공연팀 이름 및 간단 소개 */}
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

          {/* 간격 조절을 위한 Spacer 컴포넌트 */}
          <Spacer height={"1px"} />

          {/* Divider 컴포넌트를 사용하여 구분선을 추가합니다. */}
          <Divider />

          {/* 공연팀 부문 및 인원 정보 */}
          <Flex gap={"10px"}>
            <Text size={"12px"} color={colorSet.textLight}>
              {divisionToKorean(division)} {/* 공연팀 부문 */}
            </Text>
            <Divider vertical={true} />
            <Text size={"12px"} color={colorSet.textLight}>
              {teamMany}명 {/* 공연팀 인원 수 */}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Button>
  );
};

export default TeamCard;
